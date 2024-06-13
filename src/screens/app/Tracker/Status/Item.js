import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDuration } from '../utils';
import { useTheme } from 'store';
import moment from 'moment';


const getFormattedDates = (epoch, format) => {
    return moment.unix(epoch);
};
const ListItem = ({ item }) => {
    // console.log(item);

    // console.log(formatDuration(item?.date));
    const theme = useTheme();
    // console.log(moment("2024-05-10T12:46:16.042Z").toDate());
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 10,
        },
        rigthblock1: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center"
        },
        rigthblock2: {
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "center",
            paddingVertical: 3
        },
        parking: {
            backgroundColor: "blue",
            color: "#fff",
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontSize: 15,
            borderRadius: 5
        },
        column: {
            flex: 1,
            // alignItems: 'center',
            marginLeft: 10
        },
        leftColumn: {
            // flex: 1,

            flexDirection: "column",
            alignItems: 'center',
            justifyContent: "space-between"
        },
        names: {
            color: theme.primaryText,
            fontWeight: "bold",
            fontSize: 16
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                <MaterialCommunityIcons
                    name="car"
                    size={24}
                    color={item?.couleur}
                    style={styles.icon}
                />
                <View style={{ backgroundColor: "#EBF5EE", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 5, borderRadius: 5 }}>
                    <Text>{"3 min"}</Text>

                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.rigthblock1}>
                    <Text style={styles.names}>{item?.vehicleModel} - {item?.vehicleNumber}</Text>
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={20}
                        color="black"
                        style={styles.icon}
                    />
                </View>
                <View style={styles.rigthblock2}>
                    {item?.isOffline &&
                        <Text style={styles.parking}>{"P"}</Text>
                    }
                    {!item?.isOffline &&
                        <View style={{ backgroundColor: "green", paddingHorizontal: 5, paddingVertical: 5, margin: 5, borderRadius: 5, flexDirection: "row" }}>
                            <MaterialCommunityIcons
                                name="arrow-right-bold"
                                size={18}
                                color="white"
                                style={styles.icon}
                            />
                            <Text style={{ color: "white" }}>{item?.speed}</Text>
                            <Text style={{ color: "white" }}> km/h</Text>
                        </View>
                    }
                    <View style={{ backgroundColor: "#EBF5EE", paddingHorizontal: 5, paddingVertical: 5, margin: 5, borderRadius: 5, flexDirection: "row" }}>
                        <MaterialCommunityIcons
                            name="clock-outline"
                            size={18}
                            color="blue"
                            style={styles.icon}
                        />
                        <Text> {getFormattedDates(item?.timestamp, "lll").toDate().getHours()}</Text>
                        <Text> h </Text>
                        <Text>{getFormattedDates(item?.timestamp, "lll").toDate().getMinutes()}</Text>
                        <Text> min</Text>
                    </View>
                    {!item?.isOffline &&
                        <View style={{ backgroundColor: "#EBF5EE", paddingHorizontal: 5, paddingVertical: 5, margin: 5, borderRadius: 5, flexDirection: "row" }}>
                            <MaterialCommunityIcons
                                name="directions"
                                size={18}
                                color="black"
                                style={styles.icon}
                            />
                            <Text> {item?.distance}</Text>
                            <Text> km</Text>

                        </View>}
                </View>
                <Text>{(item?.address)?.split('|').join(' ')}</Text>
            </View>
        </View>
    );



};
export default ListItem;
