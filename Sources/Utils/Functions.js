import { Alert, Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);
const OpenUrl = url => Linking.openURL(url);
const setUser = async data =>
  await AsyncStorage.setItem('user', JSON.stringify(data));
const getUser = async () => {
  const value = await AsyncStorage.getItem('user');
  return JSON.parse(value);
};
const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};
const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};
const FormatedDate = ({ date, format = 'DD-MM-YYYY' }) =>
  moment(date).format(format);
const ToPercentage = ({ value, total }) => {
  const Percentage = Math.floor((value * 100) / total);
  return Percentage > 100 ? 100 : Percentage;
};
const SumOfArray = ({ array, key }) => {
  const sum = array?.reduce((a, v) => a + Number(key ? v?.[key] : v), 0);
  return Number(sum);
};
const toHHMMSS = seconds => {
  let time = moment.utc(seconds * 1000).format('HH:mm:ss');
  if (time.startsWith('00:')) {
    time = time.slice(3);
  }
  return time;
};
export default {
  ALERT,
  OpenUrl,
  setUser,
  getUser,
  setAppData,
  getAppData,
  FormatedDate,
  ToPercentage,
  SumOfArray,
  toHHMMSS,
};
