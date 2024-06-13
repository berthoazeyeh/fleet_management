/**
 * Settings component
 * @module Settings
 */

import React, { Component } from "react";
import { Text, View, Image, Switch, TouchableOpacity } from "react-native";
import { styles } from "./styles/SettingsStyles";
import language from "../../utils/language.json";
import NetworkError from "../../utils/NetworkError";
import { ThemeColor } from "../../static/constants";
import getTheme from "../../utils/ThemeContext/getTheme";
import DrawerMenuHeader from "../../utils/DrawerMenuHeader";
import getMapStyle from "../../utils/MapContext/getMapStyle";
import Icon from "react-native-vector-icons/MaterialIcons";
import withLanguage from "../../utils/LanguageContext/withLanguage";
import getNetworkInfo from "../../utils/NetworkStatusCheck/getNetworkInfo";

/**
 * Setting component
 */
class Settings extends Component {
  /**
   * @property {boolean} changeTheme Flag to monitor the dark mode
   */
  state = {
    changeTheme: false,
  };

  componentDidMount = () => {
    if (this.props.isDarkMode === true) {
      this.setState({ changeTheme: true });
    } else {
      this.setState({ changeTheme: false });
    }
  };

  // handleQuestions = () => {
  //     console.log('Button pressed');
  // }

  // handleFeedback = () => {
  //     console.log('Button pressed');
  // }

  /**
   * @function handleScreenRedirection
   * @summary Function triggered on click of buttons
   */
  handleScreenRedirection = (routeName) => {
    this.props.navigation.navigate(routeName);
  };

  /**
   * @function changeTheme
   * @summary Function triggered on click of dark mode
   */
  changeTheme = () => {
    this.setState(
      {
        changeTheme: !this.state.changeTheme,
      },
      () => {
        this.props.onThemeChange(this.state.changeTheme);
        if (this.state.changeTheme) {
          this.props.onMapTypeSelect("dark");
        } else {
          this.props.onMapTypeSelect("standard");
        }
      }
    );
  };

  render() {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          accountTitle,
          mapStylingTitle,
          privacyTitle,
          languageTitle,
          darkModeSwitch,
        },
      },
    } = language;
    return (
      <View style={styles(this.props.theme).container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: this.props.theme.backgroundColor,
            height: 45,
          }}
        >
          <DrawerMenuHeader
            title={language[selectedLanguage].SettingsScreen.screenTitle}
            navigation={this.props.navigation}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles(this.props.theme).button}
          onPress={() => this.handleScreenRedirection("ProfileSettings")}
        >
          <Image
            source={require("../../static/images/user-edit.png")}
            style={styles(this.props.theme).icon}
          />
          <Text style={styles(this.props.theme).primaryText}>
            {accountTitle}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles(this.props.theme).button}
          onPress={() => this.handleScreenRedirection("MapSettings")}
        >
          <Image
            source={require("../../static/images/map-layers.png")}
            style={styles(this.props.theme).icon}
          />
          <Text style={styles(this.props.theme).primaryText}>
            {mapStylingTitle}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity activeOpacity={0.8} style={styles(this.props.theme).button} onPress={() => this.handleQuestions()}> 
                    <Image source={require('../../static/images/questions.png')} style={styles(this.props.theme).icon} />
                    <Text style={styles(this.props.theme).primaryText}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles(this.props.theme).button} onPress={() => this.handleFeedback()}> 
                    <Image source={require('../../static/images/feedback.png')} style={styles(this.props.theme).icon} />
                    <Text style={styles(this.props.theme).primaryText}>Feedback</Text>
                </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles(this.props.theme).button}
          onPress={() => this.handleScreenRedirection("PrivacySettings")}
        >
          <Image
            source={require("../../static/images/privacy.png")}
            style={styles(this.props.theme).icon}
          />
          <Text style={styles(this.props.theme).primaryText}>
            {privacyTitle}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles(this.props.theme).button}
          onPress={() => this.handleScreenRedirection("LanguageSettings")}
        >
          <Icon
            size={22}
            name="language"
            color={ThemeColor.darkPink}
            style={{ marginRight: 15, marginLeft: 4 }}
          />
          <Text style={styles(this.props.theme).primaryText}>
            {languageTitle}
          </Text>
        </TouchableOpacity>
        <View style={styles(this.props.theme).button}>
          <Switch
            value={this.state.changeTheme}
            onValueChange={() => this.changeTheme()}
          />
          <Text style={styles(this.props.theme).primaryText}>
            {darkModeSwitch}
          </Text>
        </View>
        {!this.props.isConnected && <NetworkError />}
      </View>
    );
  }
}

export default getNetworkInfo(getTheme(getMapStyle(withLanguage(Settings))));
