import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Dashboard, Login } from 'screens'
import Apps from './bottom';
import DrawerStacks from './drawer';

export type AuthStackList = {
    Apps: undefined;
    // Appss: undefined;
};
const AuthStack = createStackNavigator<AuthStackList>()

const AppStacks = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
            }}
            initialRouteName="Apps">

            <AuthStack.Screen
                options={{ headerShown: false }}
                name="Apps"
                component={Apps}
            />
            {/* <AuthStack.Screen
                options={{ headerShown: false }}
                name="Appss"
                component={DrawerStacks}
            /> */}


        </AuthStack.Navigator>
    )
}



export default AppStacks
