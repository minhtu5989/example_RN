import React from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility';
import { Provider } from 'mobx-react/native';
import { Notifications, Permissions } from 'expo';

import { store } from './src/stores';
import { theme } from './src/constants/theme'
import { Navigation } from './src/screens/index';
import { images, tabBarIcons  } from './src/constants/images';
import { cacheImages } from './src/utils/cacheImages'

export default class App extends React.Component {
  state = {
    isReady: false,
  }

registerForPushNotifications = async() => {
    //check for existing permissions ...
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status;
        
    //check if no existing permission, ask user for permission...
    if(status !== 'granted') {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        finalStatus = status;
    }

    //check if no permission, exit the function
    if(finalStatus !== 'granted'){ return; }

    //get push notification token
    let token = await Notifications.getExpoPushTokenAsync() 
    console.log('token of notification', token);

}

  componentDidMount(){
    this.registerForPushNotifications()
    this.cacheAssets()
  }

  cacheAssets = async () => {
    const imagesAssets = cacheImages([
      ...Object.values(images),
      ...Object.values(tabBarIcons.active),
      ...Object.values(tabBarIcons.inactive),
    ]);

    await Promise.all([...imagesAssets]);

    this.setState({ isReady: true });
  };

  render() {
    if(!this.state.isReady)
      return(
        <Box f={1} center bg='white'>
          <ActivityIndicator size='large'/>
        </Box>
      );
    return (
      <Provider {...store}>
        <UtilityThemeProvider theme={theme}>
          <SafeAreaView style={{flex:1, backgroundColor: theme.color.black}}>
            <StatusBar barStyle='light-content'/>
            <Navigation/>
          </SafeAreaView>
        </UtilityThemeProvider>
      </Provider>
    );
  }
}

