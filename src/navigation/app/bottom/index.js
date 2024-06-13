import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import de MaterialCommunityIcons
import { Badge } from 'react-native-paper';
import { TrackerDashboard, TrackerStatus, HomeTracker } from 'screens';
import Collapsible from 'react-native-collapsible';
import Icon from "react-native-vector-icons/MaterialIcons";
import Theme from "theme"

const Tab = createBottomTabNavigator();



const SettingsScreen = (props) => (
    <View style={styles.container}>
        <Collapsible collapsed={false} >
            <View >

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        setiIsCollapsed(!isCollapsed)
                    }}>
                    <Icon size={30} color={"red"} name="layers" />
                </TouchableOpacity>
            </View>
        </Collapsible>
        <Text>Settings Screen</Text>
    </View>
);


const Apps = () => {
    return (
        <Tab.Navigator
            initialRouteName="Carte"
            tabBarPosition="bottom"

            screenOptions={{
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",

                tabBarGap: 10,

                tabBarIndicatorStyle: {
                    height: 0,
                },
                tabBarAndroidRipple: {
                    color: "#ffffff"
                },
                tabBarStyle: { backgroundColor: "#ffffff", paddingBottom: 5, paddingTop: 5, height: 60 },
            }}
        >
            <Tab.Screen name="Status" component={TrackerStatus}
                options={{
                    headerShown: false,
                    tabBarIcon({ color, size }) {
                        iconName = 'navigation-variant';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={{
                            color: color, ...Theme.fontStyle.montserrat.semiBold
                        }}>{"Status"}</Text>;
                    },
                }}
            />
            <Tab.Screen name="Carte" component={HomeTracker}
                options={{
                    headerShown: false,
                    tabBarIcon({ color, size }) {
                        iconName = 'map';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={{ color: color, ...Theme.fontStyle.montserrat.semiBold }}>{"Carte"}</Text>;
                    },
                }}
            />
            <Tab.Screen name="Rapport" component={SettingsScreen}
                options={{
                    headerShown: true,
                    tabBarIcon({ color, size }) {
                        iconName = 'code-equal';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={{ color: color, ...Theme.fontStyle.montserrat.semiBold }}>{"Rapport"}</Text>;
                    },
                }}
            />
            <Tab.Screen name="Video" component={SettingsScreen}
                options={{
                    headerShown: true,
                    tabBarIcon({ color, size }) {
                        iconName = 'video';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={{ color: color, ...Theme.fontStyle.montserrat.semiBold }}>{"Video"}</Text>;
                    },
                }}
            />

            <Tab.Screen name="Zone" component={SettingsScreen}
                options={{
                    headerShown: true,
                    tabBarIcon({ color, size }) {
                        iconName = 'bell-outline';
                        iconName = 'map-marker-path';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={{ color: color, ...Theme.fontStyle.montserrat.semiBold }}>{"Zone"}</Text>;
                    },
                }}
            />
            <Tab.Screen name="Dashboard" component={TrackerDashboard}
                options={{
                    headerShown: false,
                    tabBarIcon({ color, size }) {
                        iconName = 'view-dashboard-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabel({ color }) {
                        return <Text style={[styles.tabBarLabel, { color: color, overflow: "visible", ...Theme.fontStyle.montserrat.semiBold }]}>{"Dash"}</Text>;
                    },
                }}
            />
        </Tab.Navigator >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarLabel: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
});

export default Apps;
