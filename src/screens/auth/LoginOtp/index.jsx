
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import dynamicStyles from './style';
import { useSelector } from 'react-redux';
import { selectLanguageValue, useTheme } from 'store';
import { I18n } from 'i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyPhoneInput from './components/phoneInput';
import { Appbar, IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql, useLazyQuery } from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import { CountryPicker } from 'react-native-country-codes-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Logo, showCustomMessage } from 'utils';
import { Image } from 'react-native';


const GENERATE_OTP = gql`
  query($contactNumber: String!) {
    generateLoginOTPForDriver(contactNumber: $contactNumber)
  }
`;

function LoginOtp(props) {
    const { navigation } = props;
    const phoneInput = useRef(null);
    const theme = useTheme()
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [show, setShow] = useState(false);
    const styles = dynamicStyles(theme)
    const language = useSelector(selectLanguageValue);
    I18n.locale = language;
    // console.log(phone);
    const [generateLoginOTPForDriver, { ...rest }] = useLazyQuery(GENERATE_OTP, {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        onError: error => {
            console.log('error', error);
            if (error) {
                setLoading(false);
                showCustomMessage("Avertissement", error.message.toString(), "warning");
            }
        },
        onCompleted: data => {
            setLoading(false);
            if (data && data.generateLoginOTPForDriver) {
                navigation.navigate('OtpVerification', { phone: phone });
            } else {
                showCustomMessage("Avertissement", 'Something went wrong! Please try again', "warning");
            }
        },
    });
    const checkInputValidity = () => {

        if (phone === '' || phone.length <= 12) {
            showCustomMessage("Avertissement", I18n.t("LoginOtp.wrong_phone_number"), "warning");
        } else {
            navigation.navigate('OtpVerification', { phone: phone });
            // generateOtp();
        }
    };

    const generateOtp = async () => {
        setLoading(true);
        generateLoginOTPForDriver({
            variables: {
                contactNumber: phone,
            },
        });
    };
    return <View style={styles.container}>
        <ScrollView>
            <Appbar.Header style={{ backgroundColor: theme.primaryBackground, justifyContent: "space-between" }}>
                <IconButton
                    icon={() => <Ionicons name="close" size={28} color={theme.primaryStay} />}
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
                <Appbar.Content title={I18n.t("LoginOtp.auth_enterPhoneNumber")} titleStyle={styles.appbarTitle} />
            </Appbar.Header>
            <View style={styles.innerContainer}>
                <View>
                    <View style={styles.viewImage}>
                        <Image style={styles.logoImage} source={Logo} />
                    </View>
                </View>
                <View style={styles.paddingVertical}>
                    <Text style={styles.textTitle}>{I18n.t("LoginOtp.auth_add_account")}</Text>
                </View>
                <View style={styles.phoneInputContainer}>
                    <Text style={[styles.textTitlesecond, styles.textAlignLeft]}> {I18n.t("LoginOtp.auth_phone_number")}*</Text>
                    <MyPhoneInput phoneInput={phoneInput} setPhone={setPhone} onPressFlag={setShow} />
                </View>
            </View>
        </ScrollView>
        <TouchableOpacity
            style={styles.loginContainer}
            activeOpacity={0.8}
            onPress={checkInputValidity}
        >
            <Text style={styles.loginText}>{I18n.t("LoginOtp.auth_next")}</Text>
        </TouchableOpacity>
        <CountryPicker
            lang={language}
            show={show}
            initialState='+23'
            popularCountries={['cm', 'ua', 'pl']}
            pickerButtonOnPress={(item) => {
                setPhone("+009");
                setShow(false);
            }}
        />
        <Spinner
            visible={loading}
            size={60}
            overlayColor={theme.primaryBackground}
            color={theme.primary}
            textStyle={{ color: theme.primary, textAlign: "center" }}
            indicatorStyle={{ color: theme.primary }}
            textContent={I18n.t('LoginOtp.generating_otp') + ` (${phone})\n${I18n.t("please_wait")}`}
        />
    </View>
}

export default LoginOtp



