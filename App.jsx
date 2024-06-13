
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import FlashMessage from "react-native-flash-message";

import SplashScreen from 'react-native-splash-screen';
import { I18n } from 'i18n';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguageValue, useTheme } from 'store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppStack } from '@navigation';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { ThemeActionTypes } from 'store/actions/ThemeAction';
import { StatusBar } from 'react-native';

export default function App() {
  I18n.locale = useSelector(selectLanguageValue);
  // console.log(useTheme()
  // );
  const dispatch = useDispatch();
  const scheme = useColorScheme();

  useEffect(() => {
    dispatch({ type: ThemeActionTypes.SET_SYSTEM_THEME, payload: scheme });
  }, [scheme, dispatch]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...useTheme()
    },
  };
  useEffect(() => SplashScreen.hide(), []);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <FlashMessage position="center" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={useTheme().statusbar}
            barStyle={scheme != "dark" ? 'dark-content' : 'light-content'}
          />
          <AppStack />
        </GestureHandlerRootView>
      </SafeAreaView>
    </PaperProvider>
  );
}

