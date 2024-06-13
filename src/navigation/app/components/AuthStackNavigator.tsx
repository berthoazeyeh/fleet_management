import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Sign_In, Sign_Up } from 'screens';

export type AuthStackList = {
  SignInStep1: undefined;
  SignUp: undefined;
  OtpVerify: {
    phone: string;
  };
  ProfileSetup: undefined;
};
const AuthStack = createStackNavigator<AuthStackList>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName="SignInStep1">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignInStep1"
        component={Sign_In}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={Sign_Up}
      />

    </AuthStack.Navigator>
  );
};
