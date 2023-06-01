import React from 'react';
import { View } from 'react-native';
import { RNButton, RNHeader, RNStyles, RNText } from '../../Common';
import { Strings } from '../../Constants';

let main = 0;
let renderWhenItNeeds = 0;
let renderManyTimes = 0;
let child = 0;

const ReRenderIssue = ({ navigation }) => {
  console.log('Render Most Parent...');
  main = main + 1;

  return (
    <View style={(RNStyles.container, RNStyles.center)}>
      <RNHeader title={Strings.ReRenderIssue} />
      <RNText>{`Main Renders : ${main}`}</RNText>
      <RenderWhenItNeeds>
        <Child />
      </RenderWhenItNeeds>
      <RenderManyTimes />
    </View>
  );
};

const Child = () => {
  console.log('Render Child...');
  child = child + 1;
  return <RNText>{`Child Renders: ${child}`}</RNText>;
};

const RenderWhenItNeeds = ({ children }) => {
  const [state, setState] = React.useState(1);
  console.log('Render Parent...');
  renderWhenItNeeds = renderWhenItNeeds + 1;

  return (
    <>
      <RNButton title={'With Children'} onPress={() => setState(state + 1)} />
      <RNText>{`State Count: ${state}`}</RNText>
      <RNText>{`Render When It Needs Renders: ${renderWhenItNeeds}`}</RNText>

      {/* The Following children will render when the Child component's state changed. */}
      {children}
    </>
  );
};

const RenderManyTimes = () => {
  const [state, setState] = React.useState(1);
  console.log('Render Parent...');
  renderManyTimes = renderManyTimes + 1;
  return (
    <>
      <RNButton
        title={'Without Children'}
        onPress={() => setState(state + 1)}
      />
      <RNText>{`State Count: ${state}`}</RNText>

      <RNText>{`Render Many Times Renders: ${renderManyTimes}`}</RNText>

      {/* Child will render on every state change. */}
      <Child />
    </>
  );
};

export default ReRenderIssue;
