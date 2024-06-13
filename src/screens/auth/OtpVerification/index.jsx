import { NavigationProp } from '@react-navigation/native';
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
import { AuthStackList } from 'navigation/auth';
import { AppStackStackList } from 'navigation';
import { Button } from 'react-native-paper';
import { OtpInput } from 'react-native-otp-entry';
import { Pressable } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Theme } from 'utils';
import { gql, useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const VALIDATE_OTP = gql`
  query($OTP: String!, $username: String!) {
    validateOTP(OTP: $OTP, username: $username) {
      token
      refreshToken
      login {
        loginId
      }
    }
  }
`;

const GENERATE_OTP = gql`
  query($contactNumber: String!) {
    generateLoginOTPForDriver(contactNumber: $contactNumber)
  }
`;
function OtpVerification(props) {
    const { navigation, route } = props
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(I18n.t('verifying_otp') + ` (${code})\n${I18n.t("please_wait")}`);
    const [retryBtnDisabled, setRetryBtnDisabled] = useState(false);

    const { phone } = route.params;
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const theme = useTheme()
    const styles = dynamicStyles(theme)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: '',
            headerRight: () => <HelpMenu />,
            headerLeft: () => <Ionicons name="close" size={28} color={"blue"} />,
        });
    }, []);


    const [validateOTP, { ...rest }] = useLazyQuery(VALIDATE_OTP, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onError: error => {
            // console.log('error', error);
            if (error) {
                setLoading(false);
                showCustomMessage("Message", error.message.toString());
            }
        },
        onCompleted: async data => {
            // console.log('validate otp login', data);
            setLoading(false);
            if (data && data.validateOTP) {
                let token = data.validateOTP.token;
                let loginId = data.validateOTP.login.loginId;
                let refreshToken = data.validateOTP.refreshToken;
                await storeTokenAndId(token, loginId, refreshToken);
                navigation.navigate('App');
            } else {
                showCustomMessage("Message", 'Something went wrong! Please try again', "warning");
            }
        },
    });

    const [generateLoginOTPForDriver, { ...obj }] = useLazyQuery(GENERATE_OTP, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onError: error => {
            // console.log('error', error);
            setLoading(false)
            if (error) {
                setRetryBtnDisabled(false);
                showCustomMessage("Avertissement", error.message.toString(), "warning");
            }
        },
        onCompleted: data => {
            // console.log('generateLoginOTP', data);
            setLoading(false)
            if (data && data.generateLoginOTPForDriver) {
                // console.log('data', data);
                showCustomMessage(
                    "Message", I18n.t("OtpVerification.messageTwo"), "success");
                setRetryBtnDisabled(false);
            } else {
                setRetryBtnDisabled(false);
                showCustomMessage("Avertissement", "error.message.toString()", "warning");
            }
        },
    });

    const handleLoginWithOtp = (codes) => {
        setLoading(true);
        validateOTP({
            variables: {
                username: phone,
                OTP: codes,
            },
        });
    };
    const checkInputValidity = (codes) => {
        setMessage(I18n.t('verifying_otp') + ` (${code})\n${I18n.t("please_wait")}`)
        if (
            codes.length === 5
        ) {
            handleLoginWithOtp(codes);
        } else {
            showCustomMessage(
                "Avertissement", I18n.t("OtpVerification.messageOne"), "warning");
        }
    };

    const handleResendOTP = () => {
        setRetryBtnDisabled(true);
        setMessage(I18n.t('LoginOtp.generating_otp') + ` (${phone})\n${I18n.t("please_wait")}`)
        setLoading(true)
        generateLoginOTPForDriver({
            variables: {
                contactNumber: phone,
            },
        });
    };

    const storeTokenAndId = async (token, loginId, refreshToken) => {
        try {
            let tokenExpiryTime = jwtDecode(token).exp;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('loginId', loginId.toString());
            await AsyncStorage.setItem('refreshToken', refreshToken);
            await AsyncStorage.setItem('tokenExpiryTime', tokenExpiryTime.toString());
        } catch (error) {
            setLoading(false);
        }
    };
    return <View style={styles.container}>
        <View style={styles.innerContainer}>
            <View>
                <View style={styles.viewImage}>
                    <Image style={styles.logoImage} source={Logo} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.primary }]}>
                    {I18n.t('OtpVerification.verify_your_phone_number')}
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.centeredText}>
                    {I18n.t('OtpVerification.enter_the_code_we_sent_to')}
                </Text>
                <Text style={[styles.centeredText, styles.boldText]}>
                    {phone}.{' '}
                </Text>
                <Pressable onPress={navigation.goBack}>
                    <Text style={styles.linkText}>
                        {I18n.t('OtpVerification.wrong_phone_number')}?
                    </Text>
                </Pressable>
            </View>
            <View style={styles.otpContainer}>
                <OtpInput
                    numberOfDigits={5}
                    onTextChange={(code1) => {
                        setCode(code1);
                        setMessage(I18n.t('verifying_otp') + ` (${code1})\n${I18n.t("please_wait")}`)
                    }}
                    onFilled={code => {
                        console.log("code -------", code);
                        checkInputValidity(code)
                    }}
                    theme={{
                        focusedPinCodeContainerStyle: {
                            borderColor: theme.primary,
                        },
                        pinCodeContainerStyle: {
                            borderColor: theme.primaryText,
                        },
                        pinCodeTextStyle: {
                            color: theme.primary,
                        }
                    }}
                />
                <Button
                    style={styles.loginContainer}
                    onPress={() => checkInputValidity(code)}
                    mode="contained"
                >
                    <Text style={styles.loginText}>{I18n.t("OtpVerification.continue")}</Text>
                </Button>
            </View>
            <Text style={[styles.centeredText, { color: theme.primaryText }]}>
                {I18n.t('OtpVerification.enter_the_code_we_sent_to')}
            </Text>
            <View>
                <Text style={styles.centeredText}>
                    {I18n.t('OtpVerification.didnt_receive_code')}
                </Text>
                <Pressable disabled={retryBtnDisabled}
                    onPress={handleResendOTP}>
                    <Text style={[styles.boldText, styles.linkText, { color: theme.primary }]}>
                        {I18n.t('OtpVerification.resend_code')}
                    </Text>
                </Pressable>
            </View>
        </View>
        <Spinner
            visible={loading}
            size={60}
            overlayColor={theme.primaryBackground}
            color={theme.primary}
            textContent={message}
            textStyle={{ color: theme.primaryText, textAlign: "center" }}
            indicatorStyle={{ color: theme.primary }}
        />
    </View>
}

export default OtpVerification