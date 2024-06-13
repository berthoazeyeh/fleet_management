
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Linking, Dimensions } from 'react-native';
import dynamicStyles from './style';
import MapView, { Marker, Circle, Callout, Polyline } from 'react-native-maps';
import { PROVIDER_GOOGLE, } from 'react-native-maps'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ScreenView from './ScreenView/screenview';
import { useNavigationState } from '@react-navigation/native';
import { BLACK, Theme, retrieveClientLoginId, retrieveFcmToken, retrieveLoginId } from 'utils';
import { selectMapType, useTheme } from 'store';
import { gql, throwServerError, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { I18n } from 'i18n';
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialIcons";
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import de MaterialCommunityIcons
import { Badge, Divider } from 'react-native-paper';
import { client } from 'apis';
import ScreenViewItem from './ScreenView/screenviewItem';
const GET_DRIVER_INFO = gql`
  query {
    getDriverByDriverLogin {
      id
      driverName
      score
      uniqueDeviceId
      clientLoginId
    }
  }
`;
const GET_ALL_DEVICES = gql`
    query{
        getAllDeviceLocations{
        vehicleType
        vehicleNumber
        latitude
        longitude
        timestamp
        idlingStatus
        haltStatus
        isNoData
        speed
        isOffline
        uniqueId
        model_name
        plusCode
        gpsSignal
        address
        isNoGps
        vehicleModel
        vehicleGroups
        gpsStatus
        isHB
        }
    }
`;
const CLIENT_DETAILS = gql`
  query ($loginId: Int) {
    clientDetail(loginId: $loginId) {
      clientName
    }
  }
`;
const { height, width } = Dimensions.get("window");
/**
 * @summary Aspect ratio of mobile device
 */
const ASPECT_RATIO = width / height;
let didBlurSubscription;
/**
 * @summary Subscription to monitor screen focus. This is called when screen becomes active which can happen if another screen is unmounted from stack over current screen
 *
 */
let didFocusSubscription;
/**
 * @summary Map center coordinates
 */
let coordinate = null;
class HomeTracker extends Component {
    constructor(props) {
        super(props);
        this.mapView = React.createRef();
        this.state = {
            clientName: "",
            loading: false,
            isCollapsed: true,
            vehiculeDriver: [],
            listCar: [],
            vehiculeList: [],
            region: {
                latitude: 5.441006,
                longitude: 10.0620172,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            clientId: null,
            status: "All",
            isQueryActive: true,
            isModalVisible: true,
            boundingBox: {
                westLng: 0,
                southLat: 0,
                eastLng: 0,
                northLat: 0,
            },
            markerPressed: false,
            trackingExpanded: false,
            nonTrackingExpanded: false,
            initialRegion: {
                latitude: 12.9716,
                longitude: 77.5946,
                latitudeDelta: 20.89594871435075,
                longitudeDelta: 20.89594871435075 * ASPECT_RATIO,
            },
            allVehicleDetails: [],
            vehiclesOnStatus: [],
            latitudeDelta: 1.0,
            longitudeDelta: 1.0,
            latLngArray: [],
            mapReady: false,
            statusCount: {},
            noDataVehicles: [],
            removeMarkerFromCluster: false,
            removedMarker: null,
            mapCentered: false,
            toggleFullScreen: false,
            isPrimaryDevice: false,
            openMapLayersOption: false,
        };
        // Vous pouvez initialiser l'état ici si nécessaire
    }
    componentDidMount = async () => {
        let clientId = await retrieveLoginId();
        let status = "All";
        this.setState({ clientId, status }, () => {
            // this.getAllVehicles();
            // this.getAllDevices();
            this.setupPolling();
            this.startPolling();
            this.getClientDetails();
            // On blur listener
        });
        didBlurSubscription = this.props.navigation.addListener("didBlur", () => {
            this.onBlurListener();
        });
        // on focus listener
        didFocusSubscription = this.props.navigation.addListener("didFocus", () => {
            this.onFocusListener();
        });
    };
    onBlurListener = () => {
        // console.log("check on blur");
        // Stop polling
        this.stopPolling();
        this.filteredVehicles = [];
        this.setState({
            allVehicleDetails: [],
            vehiclesOnStatus: [],
            removedMarker: null,
            removeMarkerFromCluster: false,
            latLngArray: [],
        });
    };
    onFocusListener = () => {
        // console.log("check on focus");
        // Restart polling
        this.setupPolling();
        this.startPolling();
        // this.setState({ toggle: !this.state.toggle });
    };
    setupPolling = () => {
        // console.log("set up polling");
        this.allDevicesQuery = client.watchQuery({
            query: GET_ALL_DEVICES,
            pollInterval: 10000,
            fetchPolicy: "network-only",
        });
    };
    getClientDetails = async () => {
        let response = await client.query({
            query: CLIENT_DETAILS,
            variables: {
                loginId: this.state.clientId,
            },
            fetchPolicy: "network-only",
        });
        // this.setState({ clientDetail: response.data.clientDetail });
        console.log(response.data.clientDetail);
        this.setState({ clientName: response.data.clientDetail.clientName });
    };

    filterVehiclesOnStatus = (status, allVehicles) => {
        // console.log("allVehicles", allVehicles);
        let vehiclesOnStatus = allVehicles;
        if (status === "All") {
            return vehiclesOnStatus;
        } else if (status === "Tracking") {
            vehiclesOnStatus = allVehicles.filter(
                (vehicle) =>
                    vehicle.status === "Running" ||
                    vehicle.status === "Idle" ||
                    vehicle.status === "Halt" ||
                    vehicle.status === "No GPS"
            );
        } else if (status === "Non Tracking") {
            vehiclesOnStatus = allVehicles.filter(
                (vehicle) =>
                    vehicle.status === "Offline" ||
                    vehicle.status === "No Data" ||
                    vehicle.status === "Device Dead"
            );
        } else {
            vehiclesOnStatus = allVehicles.filter(
                (vehicle) => vehicle.status === status
            );
        }
        return vehiclesOnStatus;
    };

    /**
     * @function getRunningVehicles
     * @summary handle running card press
     */
    getRunningVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Running",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Running",
            vehiclesOnStatus,
            trackingExpanded: !this.state.trackingExpanded,
        });
    };

    /**
     * @function getIdleVehicles
     * @summary handle idle vehicles card press
     */
    getIdleVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Idle",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Idle",
            vehiclesOnStatus,
            trackingExpanded: !this.state.trackingExpanded,
        });
    };

    /**
     * @function getHaltVehicles
     * @summary handle halt vehicles card press
     */
    getHaltVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Halt",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Halt",
            vehiclesOnStatus,
            trackingExpanded: !this.state.trackingExpanded,
        });
    };

    /**
     * @function getNoGpsVehicles
     * @summary handle no GPS vehicles card press
     */
    getNoGpsVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "No GPS",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "No GPS",
            vehiclesOnStatus,
            trackingExpanded: !this.state.trackingExpanded,
        });
    };

    /**
     * @function getOfflineVehicles
     * @summary handle offline vehicles card press
     */
    getOfflineVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Offline",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Offline",
            vehiclesOnStatus,
            nonTrackingExpanded: !this.state.nonTrackingExpanded,
        });
    };
    setMarkerRef = (ref) => {
        this.marker = ref;
    };

    /**
     * @function handleTracking
     * @summary handle tracking card press
     */
    handleTracking = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Tracking",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Tracking",
            vehiclesOnStatus,
            trackingExpanded: !this.state.trackingExpanded,
        });
    };

    /**
     * @function handleNonTracking
     * @summary handle non tracking card press
     */
    handleNonTracking = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Non Tracking",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Non Tracking",
            vehiclesOnStatus,
            nonTrackingExpanded: !this.state.nonTrackingExpanded,
        });
    };

    /**
     * @function getNoDataVehicles
     * @summary handle no data vehicles card press
     */
    getNoDataVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "No Data",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "No Data",
            vehiclesOnStatus,
            nonTrackingExpanded: !this.state.nonTrackingExpanded,
        });
    };

    /**
     * @function getDeviceDeadVehicles
     * @summary handle dead vehicles card press
     */
    getDeviceDeadVehicles = () => {
        let vehiclesOnStatus = this.filterVehiclesOnStatus(
            "Device Dead",
            this.state.allVehicleDetails
        );
        this.setState({
            status: "Device Dead",
            vehiclesOnStatus,
            nonTrackingExpanded: !this.state.nonTrackingExpanded,
        });
    };


    getVehicleStatus = (item) => {
        let vehicleStatus =
            item.isOffline && item.isPrimaryBattery
                ? "Offline"
                : item.isOffline && !item.isPrimaryBattery
                    ? "Device Dead"
                    : item.isNoGps
                        ? "No GPS"
                        : item.haltStatus
                            ? "Halt"
                            : item.idlingStatus
                                ? "Idle"
                                : item.isNoData
                                    ? "No Data"
                                    : item.idlingStatus === false && item.haltStatus === false
                                        ? "Running"
                                        : "Device Dead";
        return vehicleStatus;
    };
    getAllDevices = async () => {
        let response = await client.query({
            query: GET_ALL_DEVICES,
        });
        // console.log("response", response.data);
        let filteredVehicles = [];
        let vehicles = response.data.getAllDeviceLocations;
        vehicles.forEach((vehicle) => {
            let modelName = vehicle.model_name.toLowerCase();

            if (vehicle.model_name != null) {
                if (modelName == "ux101" && this.state.isPrimaryDevice == false) {
                    filteredVehicles.push(vehicle);
                } else if (modelName != "ux101" && this.state.isPrimaryDevice == true) {
                    filteredVehicles.push(vehicle);
                }
            }
        });
        this.getStatusCount(filteredVehicles);
        this.getVehicleLocation(filteredVehicles);
    };
    getVehicleLocation = (vehicleDetails) => {
        // console.log("get vehicle location");
        let details = [];
        vehicleDetails.forEach((vehicle, index) => {
            let status = this.getVehicleStatus(vehicle);
            let getVehicleType = this.getVehicleType(vehicle);

            if (vehicle.latitude && vehicle.longitude) {
                // let logo =
                //     VEHICLE_LOGOS &&
                //     VEHICLE_LOGOS[getVehicleType.toLowerCase()] &&
                //     VEHICLE_LOGOS[getVehicleType.toLowerCase()].find((element) => {
                //         return element.type.toLowerCase() === status.toLowerCase();
                //     });

                // if (getVehicleType.toLowerCase().split(" ").join("") == "schoolbus") {
                //     // logo = VEHICLE_ICON[0];
                //     logo =
                //         VEHICLE_LOGOS &&
                //         VEHICLE_LOGOS["schoolbus"].find((element) => {
                //             return element.type.toLowerCase() === status.toLowerCase();
                //         });
                // }
                // if (!logo) {
                //     logo =
                //         VEHICLE_LOGO &&
                //         VEHICLE_LOGO.find((element) => {
                //             return element.type.toLowerCase() === status.toLowerCase();
                //         });
                // }

                details.push({
                    location: {
                        latitude: vehicle.latitude,
                        longitude: vehicle.longitude,
                    },
                    id: vehicle.uniqueId,
                    vehicleNumber: vehicle.vehicleNumber,
                    address: vehicle.address,
                    status: status,
                    // markerIcon: logo && logo.icon,
                    vehicleType: vehicle.vehicleType,
                    // markerIcon: IdlingIconSchoolBus,

                    // speed: vehicle.speed,
                    // timestamp: vehicle.timestamp
                });

                // if (
                //   this.state.removedMarker &&
                //   vehicle.uniqueId === this.state.removedMarker.id
                // ) {
                //   point = {
                //     latitude: vehicle.latitude,
                //     longitude: vehicle.longitude
                //   };
                // }
            }
        });
        // if (this.state.removedMarker) {
        //   this.setState({
        //     latLngArray: [...this.state.latLngArray, point],
        //     removedMarker: {
        //       ...this.state.removedMarker,
        //       location: point
        //     }
        //   });
        // }
        if (!this.state.mapCentered && this.state.mapReady && details.length > 0) {
            console.log("vehicle location", details);
            this.animateToNewRegion({
                latitude: details[0].location.latitude,
                longitude: details[0].location.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
            });
        }

        this.filteredVehicles = details;
        let allVehicleDetails = this.state.removeMarkerFromCluster
            ? details?.filter((vehicle) => vehicle.id !== this.state.removedMarker.id)
            : details;
        this.setState({
            allVehicleDetails,
            vehiclesOnStatus: this.filterVehiclesOnStatus(
                this.state.status,
                allVehicleDetails
            ),
            isQueryActive: false,
            isModalVisible: false,
        });
    };
    componentWillUnmount = () => {
        console.log("component did Unmount");

        this.stopPolling();
        if (didBlurSubscription) didBlurSubscription?.remove();
        if (didFocusSubscription) didFocusSubscription?.remove();
    };

    componentDidUpdate = (prevProps) => {

        console.log("component did update");
        // fetch data if network was not available on this screen mount
        if (
            this.props.isConnected !== prevProps.isConnected &&
            !prevProps.isConnected
        ) {
            this.setupPolling();
            this.startPolling();
        }
        // Notification check
        if (this.props.newNotificationReceived) {
            // Reset notification status when read
            this.props.notificationRead();
            this.props.navigation.navigate("Notifications");
        }
        // Navigate if user presses notification banner when app is in foreground
        if (this.props.triggerOnClickAction)
            this.props.navigation.navigate("Notifications");

        // Center map on initial load to cluster center
        if (!this.state.mapCentered && this.underlyingMapRef && coordinate) {
            this.animateToNewRegion({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
            });
            this.setState({ mapCentered: true });
        }
    };
    startPolling = () => {
        // console.log("start up polling");
        this.allDevicesQuery.subscribe({
            next: ({ data }) => {
                // console.log(
                //   "start polling client id, token",
                //   this.state.clientId,
                //   this.state.token
                // );
                let filteredVehicles = [];
                let vehicles = data.getAllDeviceLocations;
                // console.log(vehicles);
                vehicles?.forEach((vehicle) => {
                    let modelName = vehicle?.model_name.toLowerCase();

                    if (vehicle?.model_name != null) {
                        if (modelName == "ux101" && this.state.isPrimaryDevice == false) {
                            filteredVehicles.push(vehicle);
                        } else if (
                            modelName != "ux101" &&
                            this.state.isPrimaryDevice == true
                        ) {
                            filteredVehicles.push(vehicle);
                        } else {
                            // filteredVehicles.push(vehicle);
                            console.log("--------------------");
                        }
                    }
                });
                this.getStatusCount(filteredVehicles);
                this.getVehicleLocation(filteredVehicles);
            },
            error: (e) => {
                // console.log("CHECK error", e);
            },
        });
    };
    animateToNewRegion = (location) => {
        const newRegion = location;
        this.mapView.current.animateToRegion(newRegion, 1000); // 1000ms for the animation duration
    };
    getVehicleType = (item) => {
        let vehicleType = item.vehicleType && item.vehicleType;
        return vehicleType;
    };
    stopPolling = () => {
        if (this.allDevicesQuery) this.allDevicesQuery.stopPolling();
    };
    getStatusCount = (devices) => {
        let statusCount = {
            total: 0,
            tracking: 0,
            idle: 0,
            halt: 0,
            nogps: 0,
            running: 0,
            nontracking: 0,
            offline: 0,
            nodata: 0,
            devicedead: 0,
        };
        let noDataVehicles = [];

        if (devices) {
            devices.forEach((device) => {
                if (device.isOffline) {
                    if (!device.isPrimaryBattery) {
                        statusCount.devicedead++;
                    } else statusCount.offline++;
                } else if (device.isNoData) {
                    statusCount.nodata++;
                    noDataVehicles.push(device);
                    this.setState({ noDataVehicles });
                } else if (device.idlingStatus) {
                    statusCount.idle++;
                } else if (device.haltStatus) {
                    statusCount.halt++;
                } else if (device.isNoGps) {
                    statusCount.nogps++;
                } else {
                    statusCount.running++;
                }
            });
        }
        statusCount.tracking =
            statusCount.running +
            statusCount.idle +
            statusCount.halt +
            statusCount.nogps;
        statusCount.nontracking =
            statusCount.nodata + statusCount.offline + statusCount.devicedead;
        statusCount.total = statusCount.tracking + statusCount.nontracking;

        this.setState({ statusCount: statusCount });
        console.log("get status count", statusCount);
    };

    render() {
        const styles = dynamicStyles(null);
        const { navigation } = this.props;
        const { loading, isCollapsed, region } = this.state;
        console.log("vehiclesOnStatus", this.state.vehiclesOnStatus);
        return (
            <View style={styles.container}>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={region}
                    onLayout={() => {
                        // console.log(this.map)
                        // this.underlyingMapRef = this.map.ref;
                        this.setState({ mapReady: true });
                    }}
                    ref={this.mapView}
                // ref={(r) => {
                //     this.map = r;
                // }}

                >
                    {this.state.vehiclesOnStatus.length > 0 && this.state.vehiclesOnStatus.map((item) => {
                        return <ScreenViewItem key={item.id} item={item} />;

                    })}
                    {/* <ScreenView imei={"352914090647757"} />
                    <ScreenView imei={"210822322"} /> */}
                </MapView>

                <View style={{ position: "absolute", top: 10, right: 10, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            this.setState({ isCollapsed: !isCollapsed });
                        }}>
                        <Icon size={40} color={"green"} name="layers" />
                    </TouchableOpacity>
                    <Collapsible collapsed={isCollapsed} duration={700}>
                        <View style={{ flexDirection: "column", marginTop: 20, gap: 20, borderRadius: 60 }} >
                            <View style={{ paddingRight: 10, paddingTop: 10, paddingBottom: 5 }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        this.setState({ isCollapsed: !isCollapsed });
                                    }}>
                                    <MaterialCommunityIcons
                                        name="bell-ring-outline"
                                        size={24}
                                        color={"black"}
                                    />

                                </TouchableOpacity>
                                <Badge style={{ color: "white", backgroundColor: "black", position: "absolute", top: 0, right: 0 }}>{this.state.statusCount?.tracking || 0}</Badge>
                            </View>
                            <View style={{ paddingRight: 10, paddingTop: 10, paddingBottom: 5 }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        this.setState({ isCollapsed: !isCollapsed });
                                    }}>
                                    <Image
                                        source={require("assets/assets/route.png")}
                                        style={{ width: 27, height: 27 }}
                                    />
                                </TouchableOpacity>
                                <Badge style={{ color: "white", backgroundColor: "black", position: "absolute", top: 0, right: 0 }}>{this.state.statusCount?.tracking || 0}</Badge>
                            </View>
                            <View style={{ paddingRight: 10, paddingTop: 10 }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        this.setState({ isCollapsed: !isCollapsed });
                                    }}>
                                    <Image
                                        source={require("assets/assets/route1.png")}
                                        style={{ width: 27, height: 27 }}
                                    />
                                </TouchableOpacity>
                                <Badge style={{ color: "white", backgroundColor: "black", position: "absolute", top: 0, right: 0 }}>{this.state.statusCount?.nontracking || 0}</Badge>
                            </View>
                        </View>
                    </Collapsible>
                </View>

                <TouchableOpacity style={styles.buttonTMP}
                    onPress={() => {

                    }}
                >
                    <MaterialCommunityIcons
                        name="menu"
                        size={24}
                        color={"black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonText1}
                    onPress={() => {

                    }}
                >
                    <Text style={{ ...Theme.fontStyle.montserrat.semiBold, color: BLACK }}>Filter :  <Text style={{ ...Theme.fontStyle.montserrat.bold }}>{this.state.status}</Text></Text>
                </TouchableOpacity>
                <Spinner
                    visible={loading}
                    size={60}
                    color={"red"}
                    textContent={"Veuillez patienter..."}
                />
            </View>
        );
    }
}

export default HomeTracker;




// import React, { useState, useEffect } from 'react';
// import { Text, View, TouchableOpacity, Image, Alert, Linking, Dimensions } from 'react-native';
// import dynamicStyles from './style';
// import MapView, { Marker, Circle, Callout, Polyline } from 'react-native-maps';
// import { PROVIDER_GOOGLE, } from 'react-native-maps'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import ScreenView from './ScreenView/screenview';
// import { useNavigationState } from '@react-navigation/native';
// import { Theme, retrieveFcmToken } from 'utils';
// import { selectMapType, useTheme } from 'store';
// import { gql, useQuery } from '@apollo/client';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { I18n } from 'i18n';
// import { useSelector } from 'react-redux';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import Accordion from 'react-native-collapsible/Accordion';
// import Collapsible from 'react-native-collapsible';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import de MaterialCommunityIcons
// import { Badge, Divider } from 'react-native-paper';

// const GET_DRIVER_INFO = gql`
//   query {
//     getDriverByDriverLogin {
//       id
//       driverName
//       score
//       uniqueDeviceId
//       clientLoginId
//     }
//   }
// `;

// const CLIENT_DETAILS = gql`
//   query ($loginId: Int) {
//     clientDetail(loginId: $loginId) {
//       clientName
//     }
//   }
// `;
// const HomeTracker = props => {

//     const { navigation, params } = props;
//     const theme = useTheme();
//     const [loading, setLoading] = useState(false);
//     const [isCollapsed, setiIsCollapsed] = useState(true);
//     const [vehiculeDriver, setVehiculeDriver] = useState([])
//     const [listCar, setListCar] = useState([])
//     const [vehiculeList, setVehiculeList] = useState([])
//     const maptype = useSelector(selectMapType);
//     const [region, setRegion] = useState({

//         latitude: 5.441006,
//         longitude: 10.0620172,
//         latitudeDelta: 0.00922,
//         longitudeDelta: 0.00421,
//     })
//     const styles = dynamicStyles(theme);

//     const routeName = useNavigationState(state => state.routes[state.index].name);
//     //
//     // console.log(routeName === "Carte");

//     useEffect(() => {
//         // console.log(props);
//     }, [navigation]);
//     useEffect(() => {


//     }, [])

//     const {
//         loading: driverDataLoading,
//         error: driverDataError,
//         data: driverData,
//     } = useQuery(GET_DRIVER_INFO, {
//         fetchPolicy: 'network-only',
//         errorPolicy: 'all',
//         pollInterval: 1000,

//         onCompleted: async data => {
//             console.log('getDriverByDriverLogin--------------', data);
//             console.log('driverDataError--------------', driverDataError);
//             if (data && data.getDriverByDriverLogin) {
//                 let toTime = Math.floor(Date.now() / 1000).toString();
//                 let fromTime = dayjs()
//                     .subtract(1, 'days')
//                     .unix()
//                     .toString();

//                 let driverId = driverData.getDriverByDriverLogin.id;
//                 let clientLoginId = driverData.getDriverByDriverLogin.clientLoginId;
//                 let fcmTokenFromAsyncStorage = await retrieveFcmToken();

//                 // console.log('fcmTokenFromAsyncStorage', fcmTokenFromAsyncStorage);
//                 if (!fcmTokenFromAsyncStorage) {
//                     let fcmToken = await getFcmToken();
//                     // console.log('fcmToken', fcmToken);
//                     let variables = {
//                         input: {
//                             fcmToken: fcmToken,
//                             platform: Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
//                             enabled: true,
//                             driverId: driverId,
//                             clientLoginId: clientLoginId,
//                         },
//                     };
//                     console.log('variables', variables);
//                     // updateClientFcmSettings({
//                     //     variables: variables,
//                     // });
//                 }
//                 await AsyncStorage.setItem('driverId', driverId.toString());
//                 await AsyncStorage.setItem('clientLoginId', clientLoginId.toString());
//                 // updateHeaderTitle(data.getDriverByDriverLogin.driverName);
//                 // getAllAlerts(fromTime, toTime);
//             }
//         },
//     });
//     const {
//         loading: driverDataLoading1,
//         error: driverDataError1,
//         data: driverData1,
//     } = useQuery(CLIENT_DETAILS, {
//         fetchPolicy: 'network-only',
//         errorPolicy: 'all',
//         pollInterval: 1000,
//         onCompleted: async data => {
//             console.log('getDriverByDriverLogin--------------', data);
//             console.log('driverDataError--------------', driverDataError);

//         },
//     });
//     useEffect(() => {
//         console.log("driverDataLoading", driverData1);
//         console.log("driverDataLoading", maptype);

//     }, [])

//     useEffect(() => {

//     }, [])

//     return (routeName === "Carte" &&
//         <View style={styles.container}>

//             <MapView
//                 showsUserLocation={true}
//                 provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
//                 style={styles.map}
//                 initialRegion={region}
//                 mapType={maptype}

//             >

//                 {/* <ScreenView imei={"352913090131010"} /> */}
//                 <ScreenView imei={"352914090647757"} />
//                 <ScreenView imei={"210822322"} />

//             </MapView>

//             <View style={{ position: "absolute", top: 10, right: 10, justifyContent: "center", alignItems: "center" }}>

//                 <TouchableOpacity
//                     activeOpacity={0.7}

//                     onPress={() => {
//                         setiIsCollapsed(!isCollapsed)
//                     }}>
//                     <Icon size={40} color={"green"} name="layers" />
//                 </TouchableOpacity>
//                 <Collapsible collapsed={isCollapsed} duration={700}>
//                     <View style={{ flexDirection: "column", marginTop: 20, gap: 20, borderRadius: 60 }} >
//                         <View style={{ paddingRight: 10, paddingTop: 10, paddingBottom: 5 }}>
//                             <TouchableOpacity
//                                 activeOpacity={0.7}
//                                 onPress={() => {
//                                     setiIsCollapsed(!isCollapsed)
//                                 }}>
//                                 <Image
//                                     source={require("assets/assets/route.png")}
//                                     style={{ width: 27, height: 27 }}
//                                 />
//                             </TouchableOpacity>
//                             <Badge style={{ color: "white", backgroundColor: "black", position: "absolute", top: 0, right: 0 }}>0</Badge>
//                         </View>
//                         {/* <Divider /> */}
//                         <View style={{ paddingRight: 10, paddingTop: 10 }}>
//                             <TouchableOpacity
//                                 activeOpacity={0.7}
//                                 onPress={() => {
//                                     setiIsCollapsed(!isCollapsed)
//                                 }}>
//                                 <Image
//                                     source={require("assets/assets/route1.png")}
//                                     style={{ width: 27, height: 27 }}
//                                 />

//                             </TouchableOpacity>
//                             <Badge style={{ color: "white", backgroundColor: "black", position: "absolute", top: 0, right: 0 }}>2</Badge>
//                         </View>
//                         {/* <TouchableOpacity
//                             activeOpacity={0.7}
//                             onPress={() => {
//                                 setiIsCollapsed(!isCollapsed)
//                             }}>
//                             <Icon size={30} color={"red"} name="layers" />
//                         </TouchableOpacity> */}
//                     </View>
//                 </Collapsible>
//             </View>

//             <TouchableOpacity style={styles.buttonTMP}
//                 onPress={() => {

//                 }}
//             >
//                 <MaterialCommunityIcons
//                     name="menu"
//                     size={Theme.dims.iconDrawer}
//                     color={"black"}
//                 />
//             </TouchableOpacity>
//             <Spinner
//                 visible={loading}
//                 size={60}
//                 overlayColor={theme.primaryBackground}
//                 color={"red"}
//                 textStyle={{ color: theme.primary, textAlign: "center" }}
//                 indicatorStyle={{ color: theme.primary }}
//                 textContent={`${I18n.t("please_wait")}`}

//             />
//         </View>

//     );
// };

// export default HomeTracker;


