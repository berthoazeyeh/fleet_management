import { Component } from "react";
import React from "react";
import { Marker, Callout } from "react-native-maps";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";
import moment from "moment";
import { client } from "apis";
import { retrieveClientLoginId } from "utils";
import { gql } from "@apollo/client";
import ListItem from "./Item";
import Header from "./Header";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RefreshControl } from "react-native";

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
        isPrimaryBattery
        }
    }
`;









class AllItems extends Component {

    constructor(props) {
        super(props)

    }

    state = {
        filteredVehicles: null,
        begin: 0,
        isRefreshing: false,
        vehicles: null,
        vehiclesfilter: null,
        clientId: 14,
        id: 0,
        initialRegion: {
            latitude: 4.042253494262695,
            longitude: 9.703841209411621,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        },
        filtre: "",

    }

    styles = StyleSheet.create({
        container: {

            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: '#d9f9b1',
            justifyContent: "center",
            alignItems: 'center',
            elevation: 50,
            borderRadius: 20
        },
        text: {
            color: 'blue'
        }
    })

    setupPolling = () => {
        this.setState({ begin: this.state.begin + 1 })
        this.allDevicesQuery = client.watchQuery({
            query: GET_ALL_DEVICES,
            pollInterval: 10000,
            fetchPolicy: "network-only",
        });
    };
    filterDataByName = (array, searchString) => {
        if (searchString.length <= 0) {
            return array;
        }
        return array.filter(item => (item?.vehicleModel?.toLowerCase().includes(searchString?.toLowerCase()) || item?.vehicleNumber?.toLowerCase().includes(searchString?.toLowerCase())));
    };
    startPolling = () => {
        this.allDevicesQuery.subscribe({
            next: ({ data }) => {
                let vehicles = data.getAllDeviceLocations;
                console.log("le vehicule filtrer", (vehicles))
                this.setState({ vehicles: vehicles })
                if (this.state.filtre?.length > 0) {
                    vehicles = this.filterDataByName(vehicles, this.props.filter)
                }
                this.setState({ vehiclesfilter: vehicles })
            },
            error: (e) => {
                console.log("CHECK error", e);
            },
        });
    };

    stopPolling = () => {
        if (this.allDevicesQuery) this.allDevicesQuery.stopPolling();
    };


    alertItemName = (item) => {
        alert(item)
    }

    componentDidMount = async () => {
        this.setupPolling();
        this.startPolling();
        this.setState({ id: await retrieveClientLoginId() })

        if (this.state.filtre?.length > 0) {
            const vehicles1 = this.filterDataByName(this.state.vehicles, this.props.filter)
            this.setState({ vehiclesfilter: vehicles1 })
        }

    }
    componentDidUpdate = (prevProps) => {
        // fetch data if network was not available on this screen mount


        if (
            this.props.isConnected !== prevProps.isConnected &&
            !prevProps.isConnected
        ) {
            // console.log("component did update");
            this.setupPolling();
            this.startPolling();
        }

    };
    getRandomRotation = () => {
        let randomRotation = Math.floor(Math.random() * 360);
        return randomRotation;
    };

    componentWillUnmount = () => {
        this.stopPolling();

    };
    onFilterChanged = (text) => {
        this.setState({ filtre: text });
        const vehicles1 = this.filterDataByName(this.state.vehicles, text)
        this.setState({ vehiclesfilter: vehicles1 })
        // console.log("filtre", text);
    }
    handlePress = () => false

    render() {
        return (<>

            <Header navigation={this.props?.navigation} onFilterChange={this.onFilterChanged} filter={this.state.filtre} />
            <View style={styles.content1}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={() => this.startPolling()}
                        />}
                    data={this.state.vehiclesfilter}
                    keyExtractor={(item) => item.uniqueId}
                    renderItem={({ item }) => <ListItem item={item} />}
                    ListEmptyComponent={(item) => <Text style={{ flex: 1, justifyContent: "center", textAlign: "center", fontSize: 18, }}>No data</Text>}
                />
            </View>
        </>)

    }


}

export default AllItems

const getFormattedDates = (epoch, format) => {
    return moment.unix(epoch).format(format);
};

const styles = StyleSheet.create({
    marker: {
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        height: '100%'
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 250,
        justifyContent: "center"
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    content1: {
        padding: 10
    },
    // Character name
    name: {
        fontSize: 16,
        paddingBottom: 8,
        fontWeight: "900",
        color: "blue",
        textAlign: "center",
    },
    content: {
        fontSize: 12,
        textAlign: "center",
    },
    // Character image
    image: {
        width: "100%",
        height: 80,
    }
})