import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Linking, Dimensions, FlatList } from 'react-native';
import dynamicStyles from './styles';
import Header from './Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'store';
import { client } from 'apis';
import { gql } from '@apollo/client';
import { RefreshControl } from 'react-native';
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
const TrackerDashboard = props => {
    const theme = useTheme();
    const styles = dynamicStyles(theme);
    const [statusCount, setStatusCount] = useState(null);
    const data = [
        { id: 1, name: "En Ligne", value: 4, color: "green", icon: "circle-slice-8" },
        { id: 2, name: "Hors ligne", value: 1, color: "black", icon: "checkbox-blank-circle-outline" },
        { id: 3, name: "Stationnement", value: 3, color: "red", icon: "minus-circle-outline" },
        { id: 4, name: "Stationnement avec contact allumé", value: 1, color: "red", icon: "minus-circle-outline" },
        { id: 5, name: "Déplacement", value: 7, color: "green", icon: "motion" },
        { id: 6, name: "Données détectées depuis le LBS", value: 2, color: "orange", icon: "radio-tower" },
        { id: 7, name: "Sans état actuel", value: 1, color: "black", icon: "arrow-right-bold-circle-outline" },
        { id: 8, name: "Pas de messages", value: 0, color: "black", icon: "dots-circle" },
    ];
    useEffect(() => {
        getAllDevices();
        const interval = setInterval(() => {
            console.log("interval fonction execution");
            getAllDevices();
        }, 100000); // 300000 milliseconds = 5 minutes

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);
    const getData = (i) => {
        if (i === 1) {
            return statusCount?.tracking
        }
        if (i === 2) {
            return statusCount?.nontracking
        }
        if (i === 3) {
            return statusCount?.halt
        }
        if (i === 4) {
            return statusCount?.halt
        }
        if (i === 5) {
            return statusCount?.running
        }
        if (i === 6) {
            return statusCount?.idle
        }
        if (i === 7) {
            return statusCount?.nodata
        }
        if (i === 8) {
            return statusCount?.devicedead
        }
        return 0
    }
    const getAllDevices = async () => {
        let response = await client.query({
            query: GET_ALL_DEVICES,
        });
        // console.log("response", response.data);
        let filteredVehicles = [];
        let vehicles = response.data.getAllDeviceLocations;
        vehicles.forEach((vehicle) => {
            let modelName = vehicle.model_name.toLowerCase();
            if (vehicle.model_name != null) {
                filteredVehicles.push(vehicle);
            }
        });
        getStatusCount(filteredVehicles);
        // this.getVehicleLocation(filteredVehicles);
    };
    const getStatusCount = (devices) => {
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
                    // this.setState({ noDataVehicles });
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
        setStatusCount(statusCount);
        // this.setState({ statusCount: statusCount });
        console.log("get status count", statusCount);
    };
    const renderItem = ({ item }) => (
        <View style={{ flex: 1, height: 110, backgroundColor: "#fff", margin: 5, borderRadius: 10, padding: 10 }}>
            <Text style={{ color: item?.color, fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 16, marginTop: 30 }}>{statusCount ? getData(item.id) : item.value}</Text>
            <View style={{ position: "absolute", bottom: -5, right: -5, opacity: 0.1 }}>
                <MaterialCommunityIcons
                    name={item.icon ?? "cog"}
                    size={64}
                    color={item?.color}
                    style={styles.icon}
                />
            </View>
        </View>
    );
    return <View style={styles.container}
    >
        <Header navigation={props.navigation} />
        <View style={styles.content}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => getAllDevices()}
                    />}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
    </View>

}
export default TrackerDashboard;