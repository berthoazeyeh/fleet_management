import { StyleSheet } from "react-native";
import { fontFamily } from "../../../static/constants";

const styles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: props.backgroundColor
    },
    icon: {
      width: 45,
      height: 45,
      borderRadius: 10
      // resizeMode: 'center'
    },
    button: {
      margin: 10,
      padding: 10,
      width: "90%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
    },
    buttonText: {
      fontSize: 17,
      letterSpacing: 1,
      fontWeight: "500",
      fontFamily: fontFamily,
      color: props.textColor
    },
    widthSmall: {
      width: "30%"
    },
    widthBig: {
      width: "70%"
    }
  });

export default styles;
