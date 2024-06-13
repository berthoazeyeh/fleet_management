import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';

import { useState } from 'react';

import { DARK_MODE, PRIMARY, BLACK, WHITE } from 'utils';
import AuthStacks from 'navigation/auth';
import AppStacks from 'navigation/app';


export type AppStackStackList = {
  AppStacks: undefined;
  AuthStacks: undefined;

};

const Stack = createStackNavigator<AppStackStackList>();

export function AppStack() {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedRoute, setSelectedRoute] = useState<string>('chat_screen');
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Stack.Navigator
      initialRouteName='AuthStacks'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: isDarkMode ? DARK_MODE : "white",
        },
        headerTintColor: isDarkMode ? "white" : PRIMARY,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >

      <Stack.Screen

        name="AuthStacks"

        component={AuthStacks} />
      <Stack.Screen

        name="AppStacks"

        component={AppStacks} />

    </Stack.Navigator>
  );
}
