import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Routes from './Sources/Routes';
// import { Provider } from 'react-redux';
// import Store from './Sources/Redux';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    // <Provider store={Store}>
    <Routes />
    // </Provider>
  );
};

export default App;
