import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Linking, Dimensions, FlatList } from 'react-native';
import dynamicStyles from './styles';
import Header from './Header';
import ListItem from './Item';
import { useTheme } from 'store';
import AllItems from './AllItems';


const TrackerStatus = props => {
    const theme = useTheme();
    const styles = dynamicStyles(theme);
    const [filtre, setFiltre] = useState("f")
    const onFilterChanged = (text) => {
        setFiltre(text)
        console.log("filtre", filtre);
    }
    const data = [{ id: '1', name: "AZ-KO 90", isParket: true, currentLocationTitle: "Location 1", speed: 70, distance: 30, date: "2024-05-10T12:46:16.042Z", couleur: "rouge" },
    { id: '2', name: "XZ-21P", isParket: false, currentLocationTitle: "Location 2", speed: 65, distance: 25, date: "2024-05-11T08:20:00.042Z", couleur: "vert" },
    { id: '3', name: "RV-55Z", isParket: true, currentLocationTitle: "Location 3", speed: 80, distance: 35, date: "2024-05-12T15:30:00.042Z", couleur: "bleu" },
    { id: '4', name: "ZY-9OP", isParket: false, currentLocationTitle: "Location 4", speed: 60, distance: 20, date: "2024-05-13T19:15:00.042Z", couleur: "jaune" },
    { id: '5', name: "KL-31S", isParket: true, currentLocationTitle: "Location 5", speed: 75, distance: 28, date: "2024-05-14T10:00:00.042Z", couleur: "orange" },
    { id: '6', name: "WQ-10M", isParket: false, currentLocationTitle: "Location 6", speed: 68, distance: 22, date: "2024-05-15T17:45:00.042Z", couleur: "violet" },
    { id: '7', name: "GH-42L", isParket: true, currentLocationTitle: "Location 7", speed: 82, distance: 38, date: "2024-05-16T11:30:00.042Z", couleur: "cyan" },
    { id: '8', name: "PO-79X", isParket: false, currentLocationTitle: "Location 8", speed: 55, distance: 18, date: "2024-05-17T14:00:00.042Z", couleur: "magenta" },
    { id: '9', name: "MJ-15V", isParket: true, currentLocationTitle: "Location 9", speed: 78, distance: 32, date: "2024-05-18T16:45:00.042Z", couleur: "turquoise" },
    { id: '10', name: "BV-88Q", isParket: false, currentLocationTitle: "Location 10", speed: 72, distance: 26, date: "2024-05-19T09:30:00.042Z", couleur: "lime" },
    { id: '11', name: "WE-54N", isParket: true, currentLocationTitle: "Location 11", speed: 85, distance: 40, date: "2024-05-20T13:00:00.042Z", couleur: "gold" },
    { id: '12', name: "TR-22R", isParket: false, currentLocationTitle: "Location 12", speed: 58, distance: 16, date: "2024-05-21T18:15:00.042Z", couleur: "indigo" },
    { id: '13', name: "XC-90Y", isParket: true, currentLocationTitle: "Location 13", speed: 76, distance: 30, date: "2024-05-22T10:45:00.042Z", couleur: "lavender" },
    { id: '14', name: "PL-43U", isParket: false, currentLocationTitle: "Location 14", speed: 63, distance: 24, date: "2024-05-23T07:30:00.042Z", couleur: "coral" },
    { id: '15', name: "AZ-75P", isParket: true, currentLocationTitle: "Location 15", speed: 79, distance: 34, date: "2024-05-24T12:00:00.042Z", couleur: "teal" },
    { id: '16', name: "TR-21V", isParket: false, currentLocationTitle: "Location 16", speed: 56, distance: 19, date: "2024-05-25T15:15:00.042Z", couleur: "salmon" },
    { id: '17', name: "SD-11Q", isParket: true, currentLocationTitle: "Location 17", speed: 83, distance: 36, date: "2024-05-26T08:45:00.042Z", couleur: "skyblue" },
    { id: '18', name: "WE-32X", isParket: false, currentLocationTitle: "Location 18", speed: 62, distance: 21, date: "2024-05-27T11:15:00.042Z", couleur: "aquamarine" },
    { id: '19', name: "OP-42Z", isParket: true, currentLocationTitle: "Location 19", speed: 77, distance: 31, date: "2024-05-28T14:00:00.042Z", couleur: "darkred" },
    { id: '20', name: "QW-90L", isParket: false, currentLocationTitle: "Location 20", speed: 73, distance: 27, date: "2024-05-29T16:45:00.042Z", couleur: "lightgreen" },
    { id: '21', name: "TY-67H", isParket: true, currentLocationTitle: "Location 21", speed: 84, distance: 39, date: "2024-05-30T09:30:00.042Z", couleur: "lightblue" },
    { id: '22', name: "UH-31J", isParket: false, currentLocationTitle: "Location 22", speed: 59, distance: 17, date: "2024-05-31T12:15:00.042Z", couleur: "darkgreen" },
    { id: '23', name: "MN-21K", isParket: true, currentLocationTitle: "Location 23", speed: 81, distance: 37, date: "2024-04-30T15:00:00.042Z", couleur: "lightcoral" },
    { id: '24', name: "EW-54S", isParket: false, currentLocationTitle: "Location 24", speed: 64, distance: 23, date: "2024-04-30T17:45:00.042Z", couleur: "darkblue" },
    { id: '25', name: "ZA-08P", isParket: true, currentLocationTitle: "Location 25", speed: 74, distance: 29, date: "2024-04-30T10:30:00.042Z", couleur: "khaki" },
    { id: '26', name: "RT-34Y", isParket: false, currentLocationTitle: "Location 26", speed: 57, distance: 18, date: "2024-04-30T13:15:00.042Z", couleur: "darkcyan" },
    { id: '27', name: "PO-87H", isParket: true, currentLocationTitle: "Location 27", speed: 80, distance: 33, date: "2024-04-30T16:00:00.042Z", couleur: "sandybrown" },
    { id: '28', name: "QU-22R", isParket: false, currentLocationTitle: "Location 28", speed: 66, distance: 25, date: "2024-04-030T18:45:00.042Z", couleur: "mediumorchid" },
    { id: '29', name: "WE-90X", isParket: true, currentLocationTitle: "Location 29", speed: 78, distance: 31, date: "2024-04-030T11:30:00.042Z", couleur: "orchid" },
    { id: '30', name: "AZ-43L", isParket: false, currentLocationTitle: "Location 30", speed: 61, distance: 20, date: "2024-04-030T14:15:00.042Z", couleur: "lightseagreen" }]
    return <View style={styles.container}
    >
        {/* <Header navigation={props?.navigation} onFilterChange={onFilterChanged} filter={filtre} /> */}
        {/* <View style={styles.content}> */}
        <AllItems filter={filtre} navigation={props?.navigation} />
        {/* </View> */}
    </View>
}
export default TrackerStatus;