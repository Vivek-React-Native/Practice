import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PRContainer, RNText } from '../../Common';
import { Strings } from '../../Constants';
import firestore from '@react-native-firebase/firestore';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Firestore = () => {
  const inset = useSafeAreaInsets();
  const [State, setState] = useState({ IsLoading: false, Data: [] });

  useEffect(() => {
    getFamilies();
  }, []);

  const getFamilies = async () => {
    setState(p => ({ ...p, IsLoading: true }));
    try {
      const collection = await firestore().collection('Families').get();
      const documents = collection.docs.map(p => ({ ...p.data() }));
      console.log('Documents => ', JSON.stringify(documents, null, 2));
      setState(p => ({ ...p, IsLoading: false, Data: documents }));
    } catch (e) {
      console.log('Error -> ', e);
    } finally {
      setState(p => ({ ...p, IsLoading: false }));
    }
  };

  return (
    <PRContainer
      HeaderTitle={Strings.FirebaseFirestore}
      IsLoading={State.IsLoading}>
      <FlatList
        data={[...State.Data, ...State.Data]}
        keyExtractor={(v, i) => String(i)}
        contentContainerStyle={styles.contentContainerStyle(inset)}
        renderItem={({ item }) => <RenderItems item={item} />}
      />
    </PRContainer>
  );
};

const RenderItems = ({ item }) => {
  return (
    <View style={styles.renderContainer}>
      <RNText style={styles.key}>
        {`Name: `}
        <RNText style={styles.value}>{item.name}</RNText>
      </RNText>
      <RNText style={styles.key}>
        {`Age: `}
        <RNText style={styles.value}>{item.age}</RNText>
      </RNText>
      <RNText style={styles.key}>
        {`Gender: `}
        <RNText style={styles.value}>{item.gender}</RNText>
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  renderContainer: {
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.ACACAC,
  },
  key: {
    fontSize: FontSize.font14,
    fontFamily: FontFamily.OpenSans_SemiBold,
  },
  value: {
    fontSize: FontSize.font14,
  },
  contentContainerStyle: inset => ({
    paddingBottom: inset.bottom,
  }),
});

export default Firestore;
