import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { Theme } from 'utils'

const { width, height } = Dimensions.get('window')
const imageSize = height * 0.14
const photoIconSize = imageSize * 0.35

const dynamicStyles = (theme) => {
    return StyleSheet.create({
        container: {
            ...StyleSheet.absoluteFillObject,
            // justifyContent: 'flex-end',
            // alignItems: 'center',
            flex: 1
        },
        map: {
            ...StyleSheet.absoluteFillObject,
            flex: 1
        },
        buttonTMP: {
            position: "absolute",
            top: 10,
            left: 20,
            backgroundColor: "white",
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: "center", alignItems: "center",
            borderColor: "gray", borderWidth: 1
        },
        buttonText1: {
            position: "absolute",
            top: 10,
            // left: 80,
            backgroundColor: "white",
            // width: 80,
            alignSelf: "center",
            height: 40,
            paddingHorizontal: 20,
            borderRadius: 10,
            justifyContent: "center", alignItems: "center",
            // borderColor: "gray", borderWidth: 1
        }
        ,
        modalContent: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: -5,
        },
        modalView: {
            backgroundColor: theme?.primaryBackground,
            paddingVertical: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: width,
            height: height * 0.4,
            paddingHorizontal: 10,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 10,
            left: -5,
            right: 1,
            zIndex: 1,
        },
        buttonContainers: {
            position: 'absolute',
            top: 10,
            left: -5,
            // right: 265,
            zIndex: 1,
        },
        buttonOOrOff: {
            position: 'absolute',
            borderRadius: 15,
            borderWidth: 3,
            borderColor: "red",
            top: 1,
        },
        buttonOOrOn: {
            position: 'absolute',
            borderRadius: 15,
            borderWidth: 3,
            borderColor: "green",
            top: 1,
        },
        button: {
            backgroundColor: theme?.secondaryBackground,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            paddingVertical: 7,
            paddingHorizontal: 20,
        },
        buttons: {
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            paddingVertical: 7,
            paddingHorizontal: 20,
        },
        buttonText: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 14,
        },
        buttonTexts: {
            color: theme?.errorNetwork,
            fontWeight: 'bold',
            fontSize: 54,
        },
        viewBar: {
            width: 40,
            borderBottomWidth: StyleSheet.hairlineWidth * 4,
            borderBottomColor: theme?.primaryText,
            borderRadius: 5,
            marginBottom: 20,

        },
        titleBottonSheet: {
            color: theme?.primaryText,
            ...Theme?.fontStyle.montserrat.bold,
            letterSpacing: 1,
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            //marginHorizontal:15,

        },
        viewIcon: {
            width: 35,
            height: 35,
            borderRadius: 360,
            backgroundColor: theme?.gray,
            justifyContent: 'center',
            alignItems: 'center'
        },
        touchableOpacity: {
            width: '100%'
        },
        btnPicture: {
            width: "100%",
            flexDirection: 'row',
            paddingHorizontal: 15,
            alignItems: 'center',
            borderRadius: 7,
            marginVertical: 10,
            paddingVertical: 5,
            // backgroundColor: 'red',
            gap: 15
        },
        textBtn: {
            ...Theme?.fontStyle.montserrat.regular,
            color: theme?.primaryText,
        },
        image: {
            width: '100%',
            height: '100%',
        },
        imageBlock: {
            //flex: 2,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        imageContainer: {
            height: imageSize,
            width: imageSize,
            // borderWidth: 2,
            borderColor: theme?.primaryText,
            borderRadius: imageSize,
            shadowColor: '#006',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            overflow: 'hidden',
        },
        cameraIcon: {
            width: 20,
            height: 20,
            tintColor: 'white',
        },
        addButton: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme?.gray,
            opacity: 0.8,
            zIndex: 2,
            marginTop: imageSize * 0.77,
            marginLeft: -imageSize * 0.29,
            width: photoIconSize,
            height: photoIconSize,
            borderRadius: photoIconSize,
        },
        closeButton: {
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            marginRight: 15,
            backgroundColor: theme?.gray,
            width: 28,
            height: 28,
            borderRadius: 20,
            overflow: 'hidden',
        },
        closeIcon: {
            width: 27,
            height: 27,
        },
        dialogStyle: {
            borderRadius: 7,
        },
        dialogContainer: {
            //flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
        },

    })
}

export default dynamicStyles
