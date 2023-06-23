import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PRContainer,
  RNButton,
  RNHeader,
  RNInput,
  RNPagginationLoader,
  RNStyles,
  RNText,
} from '../../Common';
import { Strings } from '../../Constants';
import WifiManager from 'react-native-wifi-reborn';
import { Colors, FontFamily, FontSize, hp, isAndroid, wp } from '../../Theme';

const Wifi = () => {
  const [State, setState] = useState({
    SSID: '',
    WifiList: [],
    ListReloading: false,
    selectedWifi: null,
    password: '',
  });

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       getWifiList();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, []);

  useEffect(() => {
    getSSID();
  }, []);

  const isGranted = async () => {
    if (isAndroid) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'React Native Wifi Reborn App Permission',
            message:
              'Location permission is required to connect with or scan for Wifi networks. ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (e) {
        console.log('Error permission -> ', e);
      }
    }
  };

  const getSSID = async () => {
    if (isGranted()) {
      try {
        const SSID = await WifiManager.getCurrentWifiSSID();
        // console.log('SSID -> ', JSON.stringify(SSID, null, 2));
        setState(p => ({ ...p, SSID }));
        getWifiList();
      } catch (e) {
        console.log('Error getManager -> ', e);
      }
    }
  };

  const getWifiList = async () => {
    setState(p => ({ ...p, ListReloading: true }));
    try {
      const list = await WifiManager.loadWifiList();
      //   console.log('list -> ', JSON.stringify(list, null, 2));
      setState(p => ({ ...p, WifiList: list }));
    } catch (e) {
      console.log('Error getWifiList -> ', e);
    } finally {
      setTimeout(() => {
        setState(p => ({ ...p, ListReloading: false }));
      }, 1000);
    }
  };

  const connectToWifi = async item => {
    setState(p => ({ ...p, selectedWifi: null }));
    try {
      const connect = await WifiManager.connectToProtectedSSID(
        item?.SSID,
        State.password,
        false,
        false,
      );
      getSSID();
      console.log('connect -> ', JSON.stringify(connect, null, 2));
    } catch (e) {
      console.log('Error connectToWifi -> ', e);
    }
  };

  return (
    <PRContainer HeaderTitle={Strings.Wifi}>
      <ScrollView>
        <View style={styles.container}>
          <RNText
            family={
              FontFamily.OpenSans_SemiBold
            }>{`SSID: ${State.SSID}`}</RNText>

          <View style={styles.ListContainer}>
            <RNText
              family={
                FontFamily.OpenSans_SemiBold
              }>{`List of available Wifi`}</RNText>
            <TouchableOpacity
              onPress={getWifiList}
              disabled={State.ListReloading}>
              {State.ListReloading ? (
                <RNPagginationLoader
                  style={{ paddingVertical: 0 }}
                  size={'small'}
                />
              ) : (
                <RNText family={FontFamily.OpenSans_SemiBold}>
                  {'Reload'}
                </RNText>
              )}
            </TouchableOpacity>
          </View>

          {State.WifiList.length > 0 &&
            State.WifiList.map((v, i) => (
              <View key={i}>
                <View style={styles.renderList}>
                  <TouchableOpacity
                    onPress={() =>
                      setState(p => ({
                        ...p,
                        selectedWifi: p.selectedWifi ? null : i,
                      }))
                    }
                    style={{ flex: 1 }}>
                    <RNText>{`SSID: ${v?.SSID}`}</RNText>
                    <RNText>{`BSSID: ${v?.BSSID}`}</RNText>
                  </TouchableOpacity>
                  {State.SSID === v?.SSID && (
                    <RNText
                      family={FontFamily.OpenSans_SemiBold}
                      color={Colors.Red}>
                      {'Connected'}
                    </RNText>
                  )}
                </View>

                {State.selectedWifi === i && (
                  <View style={RNStyles.flexRowBetween}>
                    <RNInput
                      placeholder={'Enter password'}
                      style={styles.input}
                      value={State.password}
                      onChangeText={v => setState(p => ({ ...p, password: v }))}
                    />
                    <RNButton
                      title={'Connect'}
                      style={styles.doneButton}
                      textStyle={styles.doneButtonText}
                      onPress={() => connectToWifi(v)}
                    />
                  </View>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
    </PRContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  ListContainer: {
    ...RNStyles.flexRowBetween,
    paddingVertical: hp(1),
  },
  renderList: {
    ...RNStyles.flexRowBetween,
    marginVertical: hp(1),
  },
  input: {
    borderWidth: 1,
  },
  doneButton: {
    marginHorizontal: wp(1),
  },
  doneButtonText: {
    fontSize: FontSize.font16,
    fontFamily: FontFamily.OpenSans_SemiBold,
  },
});

export default Wifi;
