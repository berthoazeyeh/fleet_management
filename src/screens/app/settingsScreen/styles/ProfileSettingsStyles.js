import { StyleSheet } from "react-native";
import { ThemeColor, fontFamily } from "../../../static/constants";

const styles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      // padding: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      // alignItems: 'center',
      backgroundColor: props.backgroundColor
    },
    imageContainer: {
      padding: 10,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center"
    },
    wrapper: {
      width: "90%",
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    widthSmall: {
      width: "10%"
    },
    primaryWrapper: {
      width: "40%"
    },
    secondaryWrapper: {
      width: "70%"
    },
    image: {
      width: 100,
      height: 100,
      borderWidth: 1,
      marginRight: 15,
      borderRadius: 100,
      borderColor: ThemeColor.darkPink
    },
    primaryText: {
      fontSize: 17,
      letterSpacing: 1,
      fontWeight: "400",
      fontFamily: fontFamily,
      color: props.textColor
    },
    secondaryText: {
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: "500",
      fontFamily: fontFamily,
      color: props.textColor
    },
    userNameText: {
      fontSize: 14,
      letterSpacing: 1,
      fontWeight: "300",
      color: ThemeColor.darkPink
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: "center"
    },
    button: {
      width: "30%",
      padding: 3,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: ThemeColor.darkPink,
      borderBottomColor: ThemeColor.darkPink
    },
    buttonText: {
      fontSize: 15,
      letterSpacing: 1,
      fontWeight: "400",
      fontFamily: fontFamily,
      color: ThemeColor.white
    },
    textInput: {
      width: "90%",
      fontSize: 15,
      letterSpacing: 1,
      fontWeight: "400",
      borderBottomWidth: 2,
      fontFamily: fontFamily,
      color: props.textColor,
      borderBottomColor: ThemeColor.darkPink
    }
  });

export default styles;
