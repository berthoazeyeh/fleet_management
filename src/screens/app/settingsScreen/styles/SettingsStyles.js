import { StyleSheet } from "react-native";
import { fontFamily } from "../../../static/constants";

export const styles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: props.backgroundColor
    },
    button: {
      width: "90%",
      margin: 7,
      padding: 10,
      flexDirection: "row",
      alignItems: "center"
    },
    primaryText: {
      fontSize: 15,
      letterSpacing: 1,
      fontWeight: "500",
      fontFamily: fontFamily,
      color: props.textColor
    },
    icon: {
      width: 32,
      height: 32,
      // width: 40,
      // height: 40,
      marginRight: 10,
      resizeMode: "center"
    }
  });
