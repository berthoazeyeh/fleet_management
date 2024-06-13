import { StyleSheet } from 'react-native';
import { BLACK, PRIMARY } from 'utils/constants/colors';
import Theme from "theme"

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: theme.primaryBackground,
        },
        scrollView: {
            flex: 1,
        },
        innerView: {
            justifyContent: "space-between",
            width: "100%",
        },
        header: {
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        loginOption: {
            paddingVertical: 10,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-around",
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
            // height: '100%',
            resizeMode: 'contain',
            borderRadius: 250
        },
        loginOtpButton: {
            paddingRight: 10,
            paddingHorizontal: 20,
            paddingVertical: 3,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-end",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.primary,
        },
        formContainer: {
            flex: 1,
            alignSelf: "center",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 40,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 40,
        },
        buttonLabel: {
            color: theme.secondaryText,
            fontSize: 30,
        },
        formInnerContainer: {
            padding: 8,
            paddingHorizontal: 20,
            gap: 20,
            width: "100%",
        },
        textTitle: {
            fontSize: 25,
            color: theme.primaryText,
            fontWeight: "bold",
            textAlign: 'center'
        },
        textTitlesecond: {
            fontSize: 15,
            color: theme.primary,
            fontWeight: "bold",
            textAlign: "center"
        },
        textTitlesecondConnexion: {
            fontSize: 15,
            color: theme.primaryText,
            fontWeight: "bold",
            textAlign: "center"
        },
        textTitlesecond1: {
            fontSize: 13,
            color: theme.primary,
            fontWeight: "bold",
            textAlign: "right",
            paddingHorizontal: 5
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
        viewInputContainer: {
            marginVertical: 7,
        },
        textAndoblig: {
            flexDirection: 'row',
        },
        fieldText: {
            paddingVertical: 3,
            ...Theme.fontStyle.montserrat.bold,
            color: theme.primaryText,
        },
        viewInputContent: {
            borderWidth: 1,
            borderColor: "gray",
            alignSelf: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            paddingHorizontal: 15,
        },
        inputContainer: {
            backgroundColor: theme.primaryBackground,
            color: theme.primaryText,
            flex: 1,
            padding: 15,
            borderRadius: 5,
            letterSpacing: 1,
            ...Theme.fontStyle.montserrat.semiBold,
        },
        textdanger: {
            margin: 2,
            color: 'red',
            ...Theme.fontStyle.montserrat.bold,
        },
        textdanger1: {
            margin: 2,
            color: 'red',
            ...Theme.fontStyle.montserrat.italic,
            fontSize: 10
        },
        loginContainer: {
            backgroundColor: theme.primary,
            borderRadius: 25,
            paddingHorizontal: 20,
            padding: 0,
            fontSize: 16,
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
            color: theme.secondaryText,
            fontSize: 15,
            letterSpacing: 1.5,
            ...Theme.fontStyle.montserrat.bold,

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
