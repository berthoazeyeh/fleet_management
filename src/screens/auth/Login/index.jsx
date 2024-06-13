import { jwtDecode } from 'jwt-decode';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import dynamicStyles from './style';
import { useSelector } from 'react-redux';
import { selectLanguageValue, useTheme } from 'store';
import { I18n } from 'i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyPhoneInput from './components/phoneInput';
import { Appbar, Button, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql, useLazyQuery } from '@apollo/client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { Logo, showCustomMessage } from 'utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const schema = z.object({
    userName: z.string()
        .min(5, I18n.t('Login.validation_username_too_short')),
    password: z.string()
        .min(8, { message: I18n.t('Login.validation_password_too_short') })
        .regex(/[A-Z]/, { message: I18n.t('Login.validation_password_uppercase') })
        // .regex(/[a-z]/, { message: I18n.t('Login.validation_password_lowercase') })
        .regex(/\d/, { message: I18n.t('Login.validation_password_number') })
});
const VERIFY_LOGIN = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
      login {
        loginId
        username
        accountType
        status
        lastLoginTime
      }
    }
  }
`;

function Login(props) {
    const { navigation } = props;
    const theme = useTheme()
    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const styles = dynamicStyles(theme)
    const language = useSelector(selectLanguageValue);
    I18n.locale = language;


    const [login, { ...rest }] = useLazyQuery(VERIFY_LOGIN, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onError: error => {
            console.log('error', error);
            if (error) {
                setLoading(false);
                showCustomMessage("Avertissement", error.message, "warning")
            }
        },
        onCompleted: async data => {
            console.log('login', data);
            setLoading(false);
            if (data && data.login) {
                let loginId = data.login.login.loginId;
                let token = data.login.token;
                let refreshToken = data.login.refreshToken;
                await storeTokenAndId(token, loginId, refreshToken);
            } else {
                showCustomMessage("Avertissement", "This is our custom icon message", "warning", "bottom")
            }
        },
    });


    const checkInputValidity = (data) => {
        console.log(data);
        if (data?.userName === '' && data?.password === '') {

        } else if (data?.userName === '') {

        } else if (data?.password === '') {

        } else {
            handleLogin(data);
        }
    };

    const handleLogin = async (data) => {
        setLoading(true);
        login({
            variables: {
                username: (data?.userName)?.trim(),
                password: data?.password?.trim(),
            },
        });
    };
    const onSubmit = (data) => {
        setLoading(true);
        checkInputValidity(data);
    };
    const storeTokenAndId = async (token, loginId, refreshToken) => {
        try {
            let tokenExpiryTime = jwtDecode(token).exp;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('loginId', loginId.toString());
            await AsyncStorage.setItem('tokenExpiryTime', tokenExpiryTime.toString());
            await AsyncStorage.setItem('refreshToken', refreshToken);
            showCustomMessage("Success", "Authentification reuissi ", "success", "center")
            navigation.reset({
                index: 0,
                routes: [{ name: 'AppStacks' }],
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            showCustomMessage("Avertissement", error?.message, "warning", "bottom")
        }
    };


    return <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.innerView}>
                <View>
                    <View style={styles.viewImage}>
                        <Image style={styles.logoImage} source={Logo} />
                    </View>
                </View>
                <View style={styles.paddingVertical20}>
                    <Text style={styles.textTitle}>
                        {I18n.t("Login.auth_add_account")}
                    </Text>
                </View>
                <View style={styles.paddingVertical10}>
                    <Text style={styles.textTitlesecond}>
                        {I18n.t("Login.auth_enter_your_credentials")}
                    </Text>
                </View>
                <View style={styles.loginOption}>
                    <Text style={styles.textTitlesecondConnexion}>
                        {I18n.t("Login.auth_or_login_with")}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("LoginOtp")}
                        style={styles.loginOtpButton}>
                        <MaterialCommunityIcons
                            name='card-account-phone-outline'
                            size={22}
                            color={theme.primary} />
                        <Text style={styles.textTitlesecond1}>
                            {I18n.t("Login.auth_phone_number")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formInnerContainer}>
                        <Controller
                            control={form.control}
                            name="userName"
                            render={({ field, fieldState }) => (
                                <View style={styles.viewInputContainer}>
                                    <View style={styles.textAndoblig}>
                                        <Text style={styles.fieldText}>{I18n.t("Login.username")}</Text>
                                        <Text style={styles.textdanger}>*</Text>
                                    </View>
                                    <View style={styles.viewInputContent}>
                                        <MaterialCommunityIcons name='email' size={27} color={"gray"} />
                                        <TextInput
                                            style={styles.inputContainer}
                                            placeholderTextColor={theme.placeholderTextColor}
                                            onChange={() => (form.formState.isValid)}
                                            placeholder={I18n.t("Login.your_username")}
                                            onChangeText={field.onChange}
                                            value={field.value || ''}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                        />
                                        {!fieldState.invalid && <MaterialCommunityIcons
                                            name={"check"}
                                            size={24}
                                            color={theme.primary}
                                        />}
                                    </View>
                                    {fieldState.invalid && <Text style={styles.textdanger1}>{fieldState?.error?.message}</Text>}
                                </View>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <View style={styles.viewInputContainer}>
                                    <View style={styles.textAndoblig}>
                                        <Text style={styles.fieldText}>{I18n.t("Login.password")}</Text>
                                        <Text style={styles.textdanger}>*</Text>
                                    </View>
                                    <View style={styles.viewInputContent}>
                                        <MaterialCommunityIcons name='lock' size={27} color={fieldState.invalid ? "gray" : theme.primary} />
                                        <TextInput
                                            style={styles.inputContainer}
                                            placeholderTextColor={theme.placeholderTextColor}
                                            onChange={() => (form.formState.isValid)}
                                            secureTextEntry={securePasswordEntry}
                                            placeholder={I18n.t("Login.your_password")}
                                            onChangeText={field.onChange}
                                            value={field.value || ''}
                                            underlineColorAndroid="transparent"
                                            autoCapitalize="none"
                                        />
                                        <TouchableOpacity onPress={() => setSecurePasswordEntry(!securePasswordEntry)}>
                                            <MaterialCommunityIcons
                                                name={securePasswordEntry ? 'eye-off' : 'eye'}
                                                size={24}
                                                color="gray"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {fieldState.invalid && <Text style={styles.textdanger1}>{fieldState?.error?.message}</Text>}
                                </View>
                            )}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                style={{ ...styles.loginButton, backgroundColor: loading ? theme.gray : theme.primary }}
                                onPress={() => {
                                    if (!form.formState.isValid) {
                                        Alert.alert("ERROR", "Enter valids inputs");
                                        return;
                                    }
                                    form.handleSubmit(onSubmit)();
                                }}
                                loading={loading}
                                disabled={loading}
                                labelStyle={styles.buttonLabel}
                                mode="elevated"
                            >
                                <Text style={styles.loginText}>{I18n.t("Login.auth_next")}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
}

export default Login