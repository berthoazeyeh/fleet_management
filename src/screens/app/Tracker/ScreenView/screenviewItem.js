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


const ScreenViewItem = ({ item }) => {

    // console.log("ScreenViewItem", {
    //     ...item.location ??
    //     {
    //         latitude: item ? item?.latitude : 4.042158,
    //         longitude: item ? item?.longitude : 9.704217
    //     }
    // });
    const getRandomRotation = () => {
        let randomRotation = Math.floor(Math.random() * 360);
        return randomRotation;
    };
    return (
        <View style={{ flex: 1 }}>

            {/* {item && */}
            <Marker
                flat={true}
                rotation={getRandomRotation()}
                coordinate={
                    item.location ??
                    {
                        latitude: item ? item?.latitude : 4.042158,
                        longitude: item ? item?.longitude : 9.704217
                    }
                }
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
                                {item && item.vehicleNumber}
                            </Text>
                            <Text
                                style={styles.content}>
                                Speed : {item && item.speed}
                            </Text>
                            <Text
                                style={styles.content}>
                                Last tracked : {getFormattedDates(item && item.timestamp, "lll")}
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




export default ScreenViewItem

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