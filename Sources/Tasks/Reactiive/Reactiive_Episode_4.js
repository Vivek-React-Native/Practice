import React, { useState } from 'react';
import { StatusBar, StyleSheet, Switch } from 'react-native';
import { RNStyles } from '../../Common';
import { Colors, FontFamily, FontSize, wp } from '../../Theme';
import ReAnimated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const CIRCLE = wp(70);

const Reactiive_Episode_4 = () => {
  const [Theme, setTheme] = useState('light');
  const progress = useDerivedValue(
    () => withTiming(Theme === 'dark' ? 1 : 0),
    [Theme],
  );
  const InputRange = [0, 1];

  const ContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, InputRange, [
      THEME.light.backgroundColor,
      THEME.dark.backgroundColor,
    ]);
    return {
      backgroundColor: backgroundColor,
    };
  }, []);

  const TextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, InputRange, [
      THEME.light.textColor,
      THEME.dark.textColor,
    ]);
    return {
      color: color,
    };
  }, []);

  const CircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, InputRange, [
      THEME.light.circle,
      THEME.dark.circle,
    ]);
    return {
      backgroundColor: backgroundColor,
    };
  }, []);

  return (
    <ReAnimated.View style={[styles.container, ContainerStyle]}>
      <StatusBar
        barStyle={Theme === 'dark' ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <ReAnimated.Text style={[styles.theme, TextStyle]}>
        {'THEME'}
      </ReAnimated.Text>

      <ReAnimated.View style={[styles.circle, CircleStyle]}>
        <Switch
          value={Theme === 'dark'}
          onValueChange={v => setTheme(v ? 'dark' : 'light')}
          trackColor={{ true: Colors.Orange + '70' }}
          thumbColor={Colors.Orange}
        />
      </ReAnimated.View>
    </ReAnimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.container,
    ...RNStyles.center,
  },
  theme: {
    fontSize: FontSize.font40,
    fontFamily: FontFamily.OpenSans_Bold,
    position: 'absolute',
    top: '10%',
  },
  circle: {
    ...RNStyles.center,
    width: CIRCLE,
    height: CIRCLE,
    backgroundColor: Colors.White,
    borderRadius: CIRCLE / 2,
    shadowOffset: {
      width: wp(0),
      height: wp(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 8,
  },
});

const THEME = {
  light: {
    backgroundColor: Colors.White + '99',
    circle: Colors.White,
    textColor: Colors.Black,
  },
  dark: {
    backgroundColor: Colors.Black + '99',
    circle: Colors.Black,
    textColor: Colors.Orange,
  },
};

export default Reactiive_Episode_4;
