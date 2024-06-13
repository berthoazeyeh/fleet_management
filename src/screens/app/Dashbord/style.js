import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { BLACK, PRIMARY, PRIMARY_LIGHT } from 'utils/constants/colors';


const dynamicStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            height: 250,
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
            color: BLACK,
            fontWeight: "bold",
            textAlign: 'center'
        },
        textTitlesecond: {
            fontSize: 15,
            color: PRIMARY,
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
            width: '100%',
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginBottom: 25,
            paddingHorizontal: 1,
        },
        registerText: {
            fontSize: 14,
            letterSpacing: 1,
        },
    });
};

export default dynamicStyles;
