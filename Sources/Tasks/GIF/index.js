import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RNHeader, RNStyles } from '../../Common';
import { GIFs, Strings } from '../../Constants';
import { hp, wp } from '../../Theme';

const GIF = () => {
  const GIF = [
    { gif: GIFs.Butterfly },
    { gif: GIFs.ColorLines },
    { gif: GIFs.GirlHairs },
    { gif: GIFs.Houses },
    { gif: GIFs.Sun },
  ];

  return (
    <View style={RNStyles.container}>
      <RNHeader title={Strings.GIF} />
      <View style={styles.content}>
        <FlatList
          data={GIF}
          keyExtractor={(v, i) => String(i)}
          renderItem={({ item }) => (
            <View style={styles.Gif}>
              <Image
                source={item.gif}
                resizeMode={'cover'}
                style={RNStyles.image100}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    ...RNStyles.container,
  },
  Gif: {
    width: wp(90),
    height: hp(40),
    alignSelf: 'center',
    marginVertical: hp(2),
  },
});

export default GIF;
