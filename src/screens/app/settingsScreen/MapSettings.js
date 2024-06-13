/**
 * MapSettings component
 * @module MapSettings
 */

import React, { Component } from "react";
import Header from "../../utils/Header";
import language from "../../utils/language.json";
import styles from "./styles/MapSettingsStyles";
import NetworkError from "../../utils/NetworkError";
import getTheme from "../../utils/ThemeContext/getTheme";
import getMapStyle from "../../utils/MapContext/getMapStyle";
import showCustomMessage from "../../utils/showCustomMessage";
import withLanguage from "../../utils/LanguageContext/withLanguage";
import getNetworkInfo from "../../utils/NetworkStatusCheck/getNetworkInfo";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";

/**
 * MapSettings component
 */
class MapSettings extends Component {
  /**
   * @async
   * @function handleMaptypeChange
   * @summary Function to update the map style
   */
  handleMaptypeChange = (mapType) => {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          mapStyling: { toastMessages },
        },
      },
    } = language;
    this.props.onMapTypeSelect(mapType);
    showCustomMessage(`${toastMessages[0]} ${mapType}`);
  };

  render() {
    const { selectedLanguage } = this.props;
    const {
      [selectedLanguage]: {
        SettingsScreen: {
          mapStylingTitle,
          mapStyling: {
            standardLabel,
            satelliteLabel,
            darkLabel,
            silverLabel,
            nightLabel,
            retroLabel,
            aubergineLabel,
          },
        },
      },
    } = language;
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: this.props.theme.backgroundColor,
        }}
      >
        <View style={{ height: 45 }}>
          <Header
            title={mapStylingTitle}
            goBack={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles(this.props.theme).container}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("standard")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/standard-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {standardLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("satellite")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/satellite-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {satelliteLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("dark")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/dark-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {darkLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("silver")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/silver-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {silverLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("night")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/night-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {nightLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("retro")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/retro-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {retroLabel}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles(this.props.theme).button}
            onPress={() => this.handleMaptypeChange("aubergine")}
          >
            <View style={styles(this.props.theme).widthSmall}>
              <Image
                source={require("../../static/images/aubergine-map.png")}
                style={styles(this.props.theme).icon}
              />
            </View>
            <View style={styles(this.props.theme).widthBig}>
              <Text style={styles(this.props.theme).buttonText}>
                {aubergineLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {!this.props.isConnected && <NetworkError />}
      </ScrollView>
    );
  }
}

export default getNetworkInfo(getTheme(getMapStyle(withLanguage(MapSettings))));
