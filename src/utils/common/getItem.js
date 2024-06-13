import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveSavedToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value;
  } catch (error) {
    return null;
  }
};

export const retrieveRefreshToken = async () => {
  try {
    const value = await AsyncStorage.getItem('refreshToken');
    return value;
  } catch (error) {
    return null;
  }
};

export const retrieveExpiryTime = async () => {
  try {
    const value = await AsyncStorage.getItem('tokenExpiryTime');
    return value;
  } catch (error) {
    return null;
  }
};

export const retrieveLoginId = async () => {
  try {
    const value = await AsyncStorage.getItem('loginId');
    return parseInt(value, 10);
  } catch (error) {
    return null;
  }
};

export const retrieveDriverId = async () => {
  try {
    const value = await AsyncStorage.getItem('driverId');
    return parseInt(value, 10);
  } catch (error) {
    return null;
  }
};

export const retrieveClientLoginId = async () => {
  try {
    const value = await AsyncStorage.getItem('clientLoginId');
    return parseInt(value, 10);
  } catch (error) {
    return null;
  }
};

export const retrieveTheme = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');
    return value;
  } catch (error) {
    return null;
  }
};

export const retrieveLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem('language');
    return value;
  } catch (error) {
    return null;
  }
};

export const retrieveFcmToken = async () => {
  try {
    const value = await AsyncStorage.getItem('fcmToken');
    return value;
  } catch (error) {
    return null;
  }
};
