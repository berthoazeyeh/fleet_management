import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { Theme } from 'utils';
import { BLACK, PRIMARY, PRIMARY_LIGHT } from 'utils/constants/colors';


const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.primaryBackground,
        },
        innerContainer: {
            justifyContent: "space-evenly",
            flex: 1,
        },
        textContainer: {
            gap: 4,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        centeredText: {
            textAlign: 'center',
        },
        boldText: {
            fontWeight: 'bold',
        },
        linkText: {
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            color: theme.primary
        },
        otpContainer: {
            paddingHorizontal: 26,
            paddingVertical: 20,
            gap: 50,
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
            marginBottom: 15,
            color: BLACK,
            fontWeight: "bold",
            textAlign: 'center'
        },
        textTitleEnd: {
            fontSize: 20,
            color: BLACK,
            fontWeight: "bold",
            textAlign: 'center'
        },
        picker: {
            // height: 50,
            width: '100%',
            backgroundColor: '#fff',
            paddingHorizontal: 10,
        },
        itemStyle: {
            backgroundColor: '#fff', // Couleur de fond des éléments individuels
            fontSize: 16,
            color: '#333', // Couleur du texte des éléments individuels
        },
        itemTextStyle: {
            fontSize: 16,
            color: '#333',
        },
        select: {
            // height: 50,
            width: '100%',
            fontSize: 200,
            color: BLACK,
            fontWeight: "bold",
            textAlign: 'center',
            color: BLACK,
            textDecorationColor: "back",
            borderRadius: 25,
            borderRadius: 10,
            paddingHorizontal: 1,
            borderWidth: 2,
            borderColor: "green",
        },
        languageContainer: {
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            width: "60%",
            borderRadius: 30,
            marginTop: 30,
            paddingHorizontal: 20,
            paddingVertical: 5
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
            // width: 150,
            backgroundColor: PRIMARY,
            borderRadius: 25,
            marginTop: 20,
            paddingHorizontal: 25,
            alignItems: 'center',
            alignSelf: "center",
            overflow: 'hidden',
        },
        loginContainerPlus: {
            borderRadius: 25,
            padding: 10,
            alignItems: 'center',
            alignSelf: "center",
            overflow: 'hidden',
        },
        registerContainer: {
            width: '100%',
            // backgroundColor: theme.gray,
            // borderColor: theme.primaryBackground,
            borderWidth: 1,
            borderRadius: 25,
            padding: 12,
            alignItems: 'center',
            overflow: 'hidden',
        },
        loginText: {
            color: theme.secondaryText,
            fontSize: 15,
            letterSpacing: 1.5,
            ...Theme.fontStyle.montserrat.bold,
        },
        loginTextPlus: {
            color: PRIMARY,
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
