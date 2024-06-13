import React from "react";
import Header from "../../utils/Header";
import language from "../../utils/language.json";
import { fontFamily } from "../../static/constants";
import getTheme from "../../utils/ThemeContext/getTheme";
import Icon from "react-native-vector-icons/MaterialIcons";
import showCustomMessage from "../../utils/showCustomMessage";
import withLanguage from "../../utils/LanguageContext/withLanguage";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import getNetworkInfo from "../../utils/NetworkStatusCheck/getNetworkInfo";

const languageListData = [{ language: "English" }, { language: "French" }];

const LanguageSettings = ({
  theme,
  navigation,
  selectedLanguage,
  onLanguageChange,
}) => {
  const handleUpdateLanguage = (languageSelected) => {
    onLanguageChange(languageSelected);
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          languageSettings: { toastMessages },
        },
      },
    } = language;
    showCustomMessage(`${toastMessages[0]} ${languageSelected}`);
  };

  const {
    [selectedLanguage]: {
      SettingsScreen: { languageTitle },
    },
  } = language;

  return (
    <View style={styles(theme).container}>
      <View style={{ height: 45 }}>
        <Header title={languageTitle} goBack={() => navigation.goBack()} />
      </View>
      <View style={{ padding: 5 }}>
        {languageListData.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={styles(theme).button}
            hitSlop={{ top: 15, bottom: 15, left: 0, right: 0 }}
            onPress={() => handleUpdateLanguage(item.language)}
          >
            <Icon
              name={
                selectedLanguage == item.language
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              size={22}
              color={theme.textColor}
              style={styles(theme).iconSpacing}
            />
            <Text style={styles(theme).primaryText}>{item.language}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: theme.backgroundColor,
    },
    button: {
      padding: 10,
      height: 50,
      width: "95%",
      alignItems: "center",
      flexDirection: "row",
    },
    primaryText: {
      fontSize: 15,
      fontWeight: "400",
      fontFamily: fontFamily,
      color: theme.textColor,
    },
    iconSpacing: {
      marginRight: 10,
    },
  });

export default getNetworkInfo(getTheme(withLanguage(LanguageSettings)));
