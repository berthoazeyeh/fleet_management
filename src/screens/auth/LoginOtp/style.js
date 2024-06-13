import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { BLACK, PRIMARY, PRIMARY_LIGHT } from 'utils/constants/colors';


const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.primaryBackground,

        },
        header: {
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        viewImage: {
            padding: 10,
            margin: 10,
            width: 250,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
        },
        logoImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: 250
        },
        textTitle: {
            fontSize: 25,
            color: theme.primaryText,
            fontWeight: "bold",
            textAlign: 'center'
        },
        appbarTitle: {
            fontSize: 15,
            color: theme.primaryStay,
        },
        innerContainer: {
            justifyContent: "space-between",
            flex: 1,
        },
        textAlignLeft: {
            textAlign: "left",
        },
        paddingVertical: {
            paddingVertical: 20,
        },
        phoneInputContainer: {
            flex: 1,
            alignSelf: "center",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 40,
            padding: 30,
        },
        textTitlesecond: {
            fontSize: 15,
            color: theme.primary,
            fontWeight: "bold",
            textAlign: 'center'
        },
        textSecond: {
            fontSize: 15,
            color: BLACK,
            fontWeight: "bold",
            textAlign: 'center'
        },
        subTextTitle: {
            marginTop: 12,
            textAlign: 'center',
        },
        viewButton: {
            marginVertical: 20,
            paddingHorizontal: 25,
            gap: 20,
        },
        loginContainer: {
            width: 150,
            marginBottom: 30,
            backgroundColor: PRIMARY,
            borderRadius: 25,
            padding: 12,
            alignItems: 'center',
            alignSelf: "center",
            overflow: 'hidden',
        },
        registerContainer: {
            width: '100%',
            borderWidth: 1,
            borderRadius: 25,
            padding: 12,
            alignItems: 'center',
            overflow: 'hidden',
        },
        loginText: {
            color: "white",
            fontSize: 15,
            letterSpacing: 1.5,
            fontWeight: "bold",

        },
        input: {
            width: '15%',
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: PRIMARY,
            marginBottom: 25,
            paddingHorizontal: 1,
            textAlign: "center",
            fontWeight: "bold",
            opacity: 1, color: BLACK, fontSize: 15

        },
        inputs: {
            width: '80%',
            height: 40,
            fontWeight: "bold",
            paddingHorizontal: 1,
            opacity: 1, color: BLACK, fontSize: 15,
            letterSpacing: 1.5
        },

        registerText: {
            fontSize: 14,
            letterSpacing: 1,
        },
    });
};

export default dynamicStyles;
