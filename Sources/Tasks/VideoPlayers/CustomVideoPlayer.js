import React, { useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNHeader, RNStyles, RNText } from '../../Common';
import { Images, Strings, Videos } from '../../Constants';
import Video from 'react-native-video';
import Slider from './Slider';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Functions } from '../../Utils';

const CustomVideoPlayer = () => {
  const VideoRef = useRef();
  const [State, setState] = useState({
    IsPaused: false,
    StartSeconds: 0,
    EndSeconds: 0,
    Speed: 1,
    CurrentVideo: 0,
    Volume: 1,
  });

  const onPreviousVideo = () => {
    if (State.CurrentVideo > 0) {
      setState(p => ({
        ...p,
        CurrentVideo: p.CurrentVideo - 1,
        StartSeconds: 0,
        IsPaused: false,
      }));
    }
  };

  const onBackwardPress = () => {
    VideoRef.current.seek(State.StartSeconds - 15);
    setState(p => ({ ...p, StartSeconds: p.StartSeconds - 15 }));
  };

  const onForwardPress = () => {
    VideoRef.current.seek(State.StartSeconds + 15);
    setState(p => ({ ...p, StartSeconds: p.StartSeconds + 15 }));
  };

  const onNextVideo = () => {
    if (State.CurrentVideo < VIDEOS.length - 1) {
      setState(p => ({
        ...p,
        CurrentVideo: p.CurrentVideo + 1,
        StartSeconds: 0,
        IsPaused: false,
      }));
    }
  };

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.CustomVideoPlayer} />

      <View style={RNStyles.container}>
        <Video
          ref={VideoRef}
          source={VIDEOS[State.CurrentVideo].video}
          rate={State.Speed}
          paused={State.IsPaused}
          volume={State.Volume}
          resizeMode={'cover'}
          style={styles.VideoStyle}
          onLoad={({ duration }) =>
            setState(p => ({ ...p, EndSeconds: duration }))
          }
          onProgress={({ currentTime }) =>
            setState(p => ({ ...p, StartSeconds: currentTime }))
          }
          onEnd={() => {
            setState(p => ({ ...p, IsPaused: true }));
            onNextVideo();
          }}
        />

        <ScrollView>
          <View style={styles.ControllerContainer}>
            <RNText
              pBottom={hp(2)}
              size={FontSize.font24}
              family={FontFamily.OpenSans_Bold}
              style={styles.SongTitle}>
              {VIDEOS[State.CurrentVideo].title}
            </RNText>

            <View style={RNStyles.flexRowAround}>
              <Icons source={Images.Previous} onPress={onPreviousVideo} />
              <Icons source={Images.Backward} onPress={onBackwardPress} />
              <Icons
                source={State.IsPaused ? Images.Play : Images.Pause}
                onPress={() => setState(p => ({ ...p, IsPaused: !p.IsPaused }))}
              />
              <Icons
                source={Images.Backward}
                iconStyle={{ transform: [{ rotate: '180deg' }] }}
                onPress={onForwardPress}
              />
              <Icons
                source={Images.Previous}
                iconStyle={{ transform: [{ rotate: '180deg' }] }}
                onPress={onNextVideo}
              />
            </View>

            <View style={styles.DurationContainer}>
              <RNText>{Functions.toHHMMSS(State.StartSeconds)}</RNText>
              <Slider
                value={State.StartSeconds}
                maximumValue={State.EndSeconds}
                onValueChange={v => VideoRef.current.seek(v)}
              />
              <RNText>{Functions.toHHMMSS(State.EndSeconds)}</RNText>
            </View>

            <RNText style={styles.title}>Speed</RNText>
            <View style={RNStyles.flexRowAround}>
              {[0.5, 0.8, 1, 1.5, 2].map((v, i) => (
                <Icons
                  key={i}
                  text={v}
                  onPress={() => setState(p => ({ ...p, Speed: v }))}
                />
              ))}
            </View>

            <RNText style={styles.title}>Volume</RNText>
            <Slider
              value={State.Volume}
              minimumTrackTintColor={Colors.Orange}
              maximumTrackTintColor={Colors.Orange + '50'}
              thumbStyle={styles.thumbStyle}
              onValueChange={v => setState(p => ({ ...p, Volume: v }))}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbStyle: {
    backgroundColor: Colors.Orange,
  },
  VideoStyle: {
    width: wp(100),
    height: hp(30),
    alignSelf: 'center',
  },
  ControllerContainer: {
    marginHorizontal: wp(3),
  },
  ButtonContainer: {
    ...RNStyles.center,
    width: wp(12),
    height: wp(12),
  },
  DurationContainer: {
    marginTop: hp(1),
    ...RNStyles.flexRowBetween,
  },
  title: {
    fontFamily: FontFamily.OpenSans_SemiBold,
    textAlign: 'center',
    paddingVertical: hp(1),
  },
  SongTitle: {
    fontSize: FontSize.font24,
    fontFamily: FontFamily.OpenSans_Bold,
    paddingTop: hp(1),
  },
});

const VIDEOS = [
  { video: Videos.KyaSay, title: 'Kya Say' },
  { video: Videos.Sanak, title: 'Sanak' },
  { video: Videos.PaaniPaani, title: 'Paani Paani' },
  { video: Videos.Players, title: 'Players' },
];

const Icons = ({ source, text, disable, onPress, iconStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={styles.ButtonContainer}>
      {source && (
        <Image
          source={source}
          resizeMode={'contain'}
          style={[
            RNStyles.image60,
            { tintColor: disable ? Colors.N9A9A9A : Colors.Black },
            iconStyle,
          ]}
        />
      )}
      {text && <RNText>{text}</RNText>}
    </TouchableOpacity>
  );
};

export default CustomVideoPlayer;
