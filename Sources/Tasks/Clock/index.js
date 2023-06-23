import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PRContainer, RNHeader, RNStyles } from '../../Common';
import { Images, Strings } from '../../Constants';
import { Colors, wp } from '../../Theme';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SIZE = wp(100);

const Clock = () => {
  const [State, setState] = useState({ hour: 0, minute: 0, second: 0 });
  const hour = useSharedValue(0);
  const minute = useSharedValue(0);
  const second = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      // hour.value = withTiming(30 * date.getHours() + date.getMinutes() / 2);
      // minute.value = withTiming(6 * date.getMinutes());
      // second.value = withTiming(6 * date.getSeconds());
      setState(p => ({
        ...p,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      }));
    }, 1000);
    return () => interval;
  }, []);

  //   With SharedValue
  // const HourStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ rotate: `${hour.value}deg` }],
  //   };
  // }, [hour.value]);
  // const MinuteStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ rotate: `${minute.value}deg` }],
  //   };
  // }, [minute.value]);
  // const SecondStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ rotate: `${second.value}deg` }],
  //   };
  // }, [second.value]);

  //   With useState
  const HourStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${30 * State.hour + State.minute / 2}deg` }],
    };
  }, [State.hour]);
  const MinuteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${6 * State.minute}deg` }],
    };
  }, [State.minute]);
  const SecondStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${6 * State.second}deg` }],
    };
  }, [State.second]);

  return (
    <PRContainer HeaderTitle={Strings.Clock} ContainerStyle={styles.container}>
      <View style={styles.Box}>
        <Image source={Images.Clock} style={styles.ClockImage} />
        <Reanimated.View style={[styles.Mover, HourStyle]}>
          <View style={styles.Hour} />
        </Reanimated.View>
        <Reanimated.View style={[styles.Mover, MinuteStyle]}>
          <View style={styles.Minute} />
        </Reanimated.View>
        <Reanimated.View style={[styles.Mover, SecondStyle]}>
          <View style={styles.Second} />
        </Reanimated.View>
      </View>
    </PRContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  Box: {
    width: SIZE,
    height: SIZE,
  },
  ClockImage: {
    ...RNStyles.image100,
  },
  Mover: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 2,
  },
  Hour: {
    width: 3,
    height: '20%',
    backgroundColor: Colors.Black,
    borderRadius: 100,
    marginTop: '30%',
  },
  Minute: {
    width: 3,
    height: '25%',
    backgroundColor: Colors.Blue,
    borderRadius: 100,
    marginTop: '25%',
  },
  Second: {
    width: 3,
    height: '35%',
    backgroundColor: Colors.Red,
    borderRadius: 100,
    marginTop: '15%',
  },
});

export default Clock;
