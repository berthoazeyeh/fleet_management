import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import dynamicStyles from './style';
import { I18n } from 'i18n';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguageValue, useTheme } from 'store';
import { BLACK, Logo, PRIMARY, showCustomMessage } from 'utils/constants/colors';
import { HelpMenu } from './components/help_menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { changeLanguage } from 'store';
import CustomHeader from './components/Header';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import { gql, useLazyQuery } from '@apollo/client';
import { retrieveExpiryTime, retrieveRefreshToken } from 'utils';
import { client } from 'apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GET_REFRESH_TOKEN = gql`
  query($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`;

function Welcome(props) {
    const { navigation } = props
    const theme = useTheme()
    const [loading, setLoading] = useState(true);
    const styles = dynamicStyles(theme)
    const dispatch = useDispatch()
    const [color, setColor] = useState('#ff0000'); // Initial color
    let intervalId = null
    const onTerminate = () => {
        setLoading(false)
        clearInterval(intervalId)
    }
    // console.log(client?.link?.request);
    const [refreshToken, { ...rest }] = useLazyQuery(GET_REFRESH_TOKEN, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onCompleted: async data => {
            if (data && data.refreshToken) {
                onTerminate()
                showCustomMessage("Message", "Connected to web server", "success", "center");
                let token = data.refreshToken.token;
                let refreshTokenValue = data.refreshToken.refreshToken;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('refreshToken', refreshTokenValue);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppStacks' }],
                })
            } else {
                onTerminate()
                navigation.navigate('Login');
            }
        },
        onError: (error) => {
            console.log(error.message);
            onTerminate()
            navigation.navigate('Login');
        },
    });



    useEffect(() => {
        setTimeout(async () => {
            await getExpiryAsync();
        }, 2000);
    }, []);

    const getExpiryAsync = async () => {
        const expiryTime = await retrieveExpiryTime();
        // console.log('expiryTime', expiryTime);
        if (expiryTime) {
            await checkSessionValidity(parseInt(expiryTime, 10));
        } else {
            navigation.navigate('Login');
        }
    };

    const checkSessionValidity = async expiryTime => {
        let now = new Date().getTime() / 1000;
        if (now < expiryTime) {
            onTerminate()
            showCustomMessage("Message", "Connected to web server", "success", "center");
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppStacks' }],
            })
        } else {
            let refreshTokenValue = await retrieveRefreshToken();
            if (refreshTokenValue) {
                refreshToken({
                    variables: {
                        refreshToken: refreshTokenValue,
                    },
                });
            } else {
                navigation.navigate('Login');
                onTerminate()
            }
        }
    };

    useEffect(() => {
        const colors = ['green', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Colors to cycle through
        let index = 0;

        intervalId = setInterval(() => {
            setColor(colors[index]);
            index = (index + 1) % colors.length; // Loop through colors array
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: theme.primaryBackground,
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                color: theme.primaryText,
            },
            title: I18n.t("Welcome.auth_welcomeMessage"),
            headerRight: () => <HelpMenu />,
            headerLeft: () => <Ionicons style={{ marginLeft: 20 }} name="close" size={28} color={theme.primaryText} />,
        });
    }, [navigation]);
    const language = useSelector(selectLanguageValue);


    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <CustomHeader theme={theme} />
            <View style={{ justifyContent: "space-between", flex: 1 }}>
                <View>
                    <View style={styles.viewImage}>
                        <Image style={styles.logoImage} source={Logo} />
                    </View>
                    <Text style={styles.textTitle}>{I18n.t("Welcome.auth_welcomeMessage")}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <Text style={styles.textSecond}>{I18n.t("auth_readTerms")}</Text>

                    <TouchableOpacity
                        style={styles.loginContainerPlus}
                        activeOpacity={0.8}
                        onPress={() => {
                        }}
                    >
                        <Text style={styles.loginTextPlus}>{I18n.t("Welcome.auth_privacyPolicy")}</Text>
                    </TouchableOpacity >
                </View >
                <Text style={styles.textSecond}>{I18n.t('Welcome.auth_acceptAndContinue')} {' '}
                    <Text style={styles.loginTextPlus}>{I18n.t("Welcome.auth_termsOfService")}</Text>
                </Text>


                <View style={styles.languageContainer}>
                    <Ionicons
                        name="globe"
                        size={30}
                        color={PRIMARY}
                    />

                    <Picker
                        selectedValue={language}
                        onValueChange={(itemValue, itemIndex) => {
                            dispatch(changeLanguage(itemValue));
                        }}
                        style={{ height: 50, width: 150, color: BLACK }}
                        dropdownIconColor={PRIMARY}
                        mode="dropdown"
                    >
                        <Picker.Item label={I18n.t("Welcome.languageFrench")} value="fr" />
                        <Picker.Item label={I18n.t("Welcome.languageEnglish")} value="en" />
                    </Picker >
                </View >
            </View >
        </ScrollView >
        <TouchableOpacity
            style={styles.loginContainer}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate("Login")
            }}
        >
            <Text style={styles.loginText}>{I18n.t("Welcome.auth_acceptAndContinueText")}</Text>
        </TouchableOpacity >
        <Spinner
            visible={loading}
            size={60}
            overlayColor={theme.primaryBackground}
            color={color}
            textStyle={{ color: theme.primary, textAlign: "center" }}
            indicatorStyle={{ color: theme.primary }}
            textContent={`${I18n.t("please_wait")}`}

        />
    </View >
}

export default Welcome