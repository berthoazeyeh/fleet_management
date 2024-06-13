import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Login, LoginOtp, OtpVerification, Welcome } from 'screens'

export type AuthStackList = {
    Welcome: undefined;
    LoginOtp: undefined;
    OtpVerification: undefined;
    Login: undefined;

};
const AuthStack = createStackNavigator<AuthStackList>()

const AuthStacks = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
            }}
            initialRouteName="Welcome">
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="Welcome"
                component={Welcome}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="LoginOtp"
                component={LoginOtp}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="OtpVerification"
                component={OtpVerification}
            />
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
        </AuthStack.Navigator>
    )
}



export default AuthStacks
