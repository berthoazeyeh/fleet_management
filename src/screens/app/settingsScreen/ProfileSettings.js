import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import gql from "graphql-tag";
import Header from "../../utils/Header";
import language from "../../utils/language.json";
import styles from "./styles/ProfileSettingsStyles";
import NetworkError from "../../utils/NetworkError";
import apolloConsumer from "../../apollo/apolloConsumer";
import getTheme from "../../utils/ThemeContext/getTheme";
import Icon from "react-native-vector-icons/MaterialIcons";
import showCustomMessage from "../../utils/showCustomMessage";
import AsyncStorage from "@react-native-community/async-storage";
import { retriveClientId } from "../../utils/getFromAsyncStorage";
import withLanguage from "../../utils/LanguageContext/withLanguage";
import getNetworkInfo from "../../utils/NetworkStatusCheck/getNetworkInfo";

const LOGIN_DETAIL = gql`
  query ($loginId: Int) {
    loginDetail(loginId: $loginId) {
      username
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ($newPassword: String!) {
    changeUsernamePassword(newPassword: $newPassword)
  }
`;

class ProfileSettings extends Component {
  state = {
    userName: "",
    newPassword: "",
    confirmNewPassword: "",
    isPasswordHidden: true,
    isConfirmPasswordHidden: true,
  };

  componentDidMount() {
    this.getLoginDetail();
  }

  getLoginDetail = async () => {
    let clientId = await retriveClientId();
    let response = await this.props.client.query({
      query: LOGIN_DETAIL,
      variables: {
        loginId: clientId,
      },
    });
    this.setState({ userName: response.data.loginDetail.username });
  };

  handlePasswordChange = (type, password) => {
    if (type === "newPass") this.setState({ newPassword: password });
    else if (type === "confirmNewPass")
      this.setState({ confirmNewPassword: password });
  };

  checkInputValidity = () => {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          accountSettings: { toastMessages },
        },
      },
    } = language;
    if (this.state.newPassword === "" && this.state.confirmNewPassword === "") {
      showCustomMessage(toastMessages[0]);
    } else if (this.state.newPassword !== this.state.confirmNewPassword) {
      showCustomMessage(toastMessages[1]);
    } else {
      if (this.props.isConnected) this.changeUsernamePassword();
      else showCustomMessage(toastMessages[2]);
    }
  };

  changeUsernamePassword = async () => {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          accountSettings: { toastMessages },
        },
      },
    } = language;
    let response = await this.props.client.mutate({
      mutation: CHANGE_PASSWORD,
      variables: {
        newPassword: this.state.newPassword,
      },
    });
    if (response.data.changeUsernamePassword) {
      Alert.alert(
        toastMessages[4],
        toastMessages[5],
        [
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.multiRemove([
                "token",
                "expiryTime",
                "loginId",
                "fcmToken",
                "refreshToken",
              ]);
              this.props.navigation.navigate("Auth");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      showCustomMessage(toastMessages[3]);
    }
  };

  render() {
    const { selectedLanguage } = this.props;
    let touchableArea = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    };

    let isPasswordHidden;
    isPasswordHidden = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.setState({ isPasswordHidden: !this.state.isPasswordHidden })
        }
        hitSlop={touchableArea}
      >
        <Icon
          size={22}
          name={
            this.state.isPasswordHidden === true
              ? "visibility-off"
              : "visibility"
          }
          color={this.props.theme.textColor}
        />
      </TouchableOpacity>
    );

    let isConfirmPasswordHidden;
    isConfirmPasswordHidden = (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.setState({
            isConfirmPasswordHidden: !this.state.isConfirmPasswordHidden,
          })
        }
        hitSlop={touchableArea}
      >
        <Icon
          size={22}
          name={
            this.state.isConfirmPasswordHidden === true
              ? "visibility-off"
              : "visibility"
          }
          color={this.props.theme.textColor}
        />
      </TouchableOpacity>
    );

    const {
      [selectedLanguage]: {
        SettingsScreen: {
          accountTitle,
          accountSettings: {
            userNameLabel,
            passwordLabel,
            changeButtonTitle,
            newPasswordPlaceholder,
            confirmPasswordPlaceholder,
          },
        },
      },
    } = language;

    return (
      <View style={styles(this.props.theme).container}>
        <View style={{ height: 45 }}>
          <Header
            title={accountTitle}
            goBack={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles(this.props.theme).imageContainer}>
          <Image
            source={require("../../static/images/avatar.png")}
            style={styles(this.props.theme).image}
          />
        </View>
        <View style={styles(this.props.theme).wrapper}>
          <View style={styles(this.props.theme).widthSmall}>
            <Image
              source={require("../../static/images/username.png")}
              style={styles(this.props.theme).icon}
            />
          </View>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <Text style={styles(this.props.theme).secondaryText}>
              {userNameLabel}:{" "}
            </Text>
            <Text style={styles(this.props.theme).userNameText}>
              {this.state.userName}
            </Text>
          </View>
        </View>
        <View style={styles(this.props.theme).wrapper}>
          <View style={styles(this.props.theme).widthSmall}>
            <Image
              source={require("../../static/images/change-password.png")}
              style={styles(this.props.theme).icon}
            />
          </View>
          <View style={styles(this.props.theme).primaryWrapper}>
            <Text style={styles(this.props.theme).secondaryText}>
              {passwordLabel}
            </Text>
          </View>
          <TouchableOpacity
            style={styles(this.props.theme).button}
            activeOpacity={0.7}
            onPress={this.checkInputValidity}
          >
            <Text style={styles(this.props.theme).buttonText}>
              {changeButtonTitle}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles(this.props.theme).wrapper}>
          <View
            style={[
              styles(this.props.theme).secondaryWrapper,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              placeholderTextColor={this.props.theme.textColor}
              placeholder={newPasswordPlaceholder}
              style={styles(this.props.theme).textInput}
              value={this.state.newPassword}
              secureTextEntry={this.state.isPasswordHidden}
              onChangeText={(password) =>
                this.handlePasswordChange("newPass", password)
              }
            />
            {isPasswordHidden}
          </View>
        </View>
        <View style={styles(this.props.theme).wrapper}>
          <View
            style={[
              styles(this.props.theme).secondaryWrapper,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              placeholderTextColor={this.props.theme.textColor}
              placeholder={confirmPasswordPlaceholder}
              style={styles(this.props.theme).textInput}
              value={this.state.confirmNewPassword}
              secureTextEntry={this.state.isConfirmPasswordHidden}
              onChangeText={(password) =>
                this.handlePasswordChange("confirmNewPass", password)
              }
            />
            {isConfirmPasswordHidden}
          </View>
        </View>
        {!this.props.isConnected && <NetworkError />}
      </View>
    );
  }
}

export default apolloConsumer(
  getNetworkInfo(getTheme(withLanguage(ProfileSettings)))
);
