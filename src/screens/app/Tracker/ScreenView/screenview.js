import { Component } from "react";
import React from "react";
import { Marker, Callout } from "react-native-maps";
import { Text, StyleSheet, View, Image } from "react-native";
import moment from "moment";
import { client } from "apis";
import { retrieveClientLoginId } from "utils";
import { gql } from "@apollo/client";

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


class ScreenView extends Component {

    constructor(props) {
        super(props)

    }

    state = {
        filteredVehicles: null,
        begin: 0,
        isRefreshing: false,
        vehicles: null,
        clientId: 14,
        id: 0,
        initialRegion: {
            latitude: 4.042253494262695,
            longitude: 9.703841209411621,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
        }
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

    startPolling = () => {
        this.allDevicesQuery.subscribe({
            next: ({ data }) => {
                let vehicles = data.getAllDeviceLocations;
                console.log("liste complete", vehicles);
                vehicles.map((vehicle, index) => {
                    if (vehicle.uniqueId.split("_")[1] === this.props.imei) {
                        this.setState({ filteredVehicles: vehicle })
                    }
                })
                console.log("le vehicule filtrer", this.state.filteredVehicles)
                this.setState({ vehicles: vehicles })
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


    }

    getRandomRotation = () => {
        let randomRotation = Math.floor(Math.random() * 360);
        return randomRotation;
    };

    componentWillUnmount = () => {
        this.stopPolling();

    };

    handlePress = () => false

    render() {
        // console.log("les vehicules", this.vehicles);
        return (
            <View style={{ flex: 1 }}>

                {/* {this.state.filteredVehicles && */}
                <Marker
                    flat={true}
                    rotation={this.getRandomRotation()}
                    coordinate={{ latitude: this.state.filteredVehicles ? this.state.filteredVehicles.latitude : this.state.initialRegion.latitude, longitude: this.state.filteredVehicles ? this.state.filteredVehicles.longitude : this.state.initialRegion.longitude }}
                >
                    <Image
                        style={styles.marker}
                        resizeMode="contain"
                        source=
                        {

                            require('./images/marker-icons/blue.png')
                            // require('./images/marker-icons/grey.png')

                        }
                    />
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text
                                    style={styles.name}>
                                    {this.state.filteredVehicles && this.state.filteredVehicles.vehicleNumber}
                                </Text>
                                <Text
                                    style={styles.content}>
                                    Speed : {this.state.filteredVehicles && this.state.filteredVehicles.speed}
                                </Text>
                                <Text
                                    style={styles.content}>
                                    Last tracked : {getFormattedDates(this.state.filteredVehicles && this.state.filteredVehicles.timestamp, "lll")}
                                </Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>

                </Marker>
                {/* )
                    } */}

            </View>
        )
    }


}

export default ScreenView

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