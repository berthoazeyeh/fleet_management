/**
 * PrivacySettings component
 * @module PrivacySettings
 */

import React, { Component } from "react";
import gql from "graphql-tag";
import Header from "../../utils/Header";
import language from "../../utils/language.json";
import NetworkError from "../../utils/NetworkError";
import { fontFamily } from "../../static/constants";
import getTheme from "../../utils/ThemeContext/getTheme";
import apolloConsumer from "../../apollo/apolloConsumer";
import showCustomMessage from "../../utils/showCustomMessage";
import AsyncStorage from "@react-native-community/async-storage";
import withLanguage from "../../utils/LanguageContext/withLanguage";
import { View, Text, Switch, Platform, StyleSheet } from "react-native";
import getNetworkInfo from "../../utils/NetworkStatusCheck/getNetworkInfo";
import { retriveNotificationSwitchState } from "../../utils/getFromAsyncStorage";

const TOGGLE_NOTIFICATION_SETTINGS = gql`
  mutation ($input: FcmTokenInput!) {
    updateClientFcmSettings(input: $input) {
      clientLoginId
    }
  }
`;

/**
 * PrivacySettings component
 */
class PrivacySettings extends Component {
  /**
   * @property {boolean} switch Flag to monitor notifications on/off
   */
  state = {
    switch: true,
  };

  componentDidMount = async () => {
    let storedSwitchState = await retriveNotificationSwitchState();
    // console.log("storedSwitchState", storedSwitchState);
    if (storedSwitchState === "true") {
      this.setState({ switch: true });
    } else {
      this.setState({ switch: false });
    }
  };

  /**
   * @async
   * @function handleNotificationChange
   * @summary Function to update the api with notification on/off settings and stored in asyncstorage
   */
  handleNotificationChange = async () => {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          privacySettings: { toastMessages },
        },
      },
    } = language;
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    let platform = Platform.OS === "ios" ? "IOS" : "ANDROID";
    let response = await this.props.client.mutate({
      mutation: TOGGLE_NOTIFICATION_SETTINGS,
      variables: {
        input: {
          fcmToken,
          platform,
          enabled: this.state.switch,
        },
      },
    });
    if (response.data && response.data.updateClientFcmSettings) {
      await AsyncStorage.setItem(
        "notificationSwitch",
        this.state.switch.toString()
      );
      showCustomMessage(toastMessages[0]);
    } else {
      showCustomMessage(toastMessages[1]);
      // Switch back if unable to save settings
      this.setState({ switch: !this.state.switch });
    }
  };

  render() {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          privacyTitle,
          privacySettings: {
            notificationPrimaryLabel,
            notificationSecondaryLabel,
          },
        },
      },
    } = language;

    return (
      <View style={styles(this.props.theme).container}>
        <View style={{ height: 45 }}>
          <Header
            title={privacyTitle}
            goBack={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles(this.props.theme).wrapper}>
          <View style={{ width: "70%" }}>
            <Text style={styles(this.props.theme).primaryText}>
              {notificationPrimaryLabel}
            </Text>
            <Text style={styles(this.props.theme).secondaryText}>
              {notificationSecondaryLabel}
            </Text>
          </View>
          <View style={{ width: "30%" }}>
            <Switch
              value={this.state.switch}
              onValueChange={() => {
                this.setState({ switch: !this.state.switch }, () =>
                  this.handleNotificationChange()
                );
              }}
            />
          </View>
        </View>
        {!this.props.isConnected && <NetworkError />}
      </View>
    );
  }
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // padding: 7,
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: props.backgroundColor,
    },
    wrapper: {
      padding: 8,
      width: "90%",
      alignSelf: "center",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    primaryText: {
      fontSize: 16,
      letterSpacing: 1,
      fontWeight: "400",
      fontFamily: fontFamily,
      color: props.textColor,
    },
    secondaryText: {
      fontSize: 11,
      fontWeight: "300",
      fontFamily: fontFamily,
      color: props.textColor,
    },
  });

export default apolloConsumer(
  getNetworkInfo(getTheme(withLanguage(PrivacySettings)))
);
