import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
  await AsyncStorage.multiRemove([
    'token',
    'loginId',
    'driverId',
    'fcmToken',
    'language',
    'refreshToken',
    'clientLoginId',
    'tokenExpiryTime',
  ]);
};

export const searchFilter = (list, searchKey, searchValue) => {
  const searchResult = list.filter(item => {
    const vehicleNumber = `${item[searchKey].toUpperCase()}`;
    const searchText = searchValue.toUpperCase();
    return vehicleNumber.indexOf(searchText) > -1;
  });
  return searchResult;
};
