/**
 * @format
 */
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { appStore, persistor, selectLanguageValue } from 'store';
import { I18n } from 'i18n';
import { ApolloProvider } from '@apollo/client';
import { client } from 'apis';
import { NavigationContainer } from '@react-navigation/native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "red",
    },
};

const AppWrapper = () => {

    return (
        <ApolloProvider client={client}>
            <Provider store={appStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                        <NavigationContainer>
                            <App />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        </ApolloProvider>
    );
}
AppRegistry.registerComponent(appName, () => AppWrapper);
