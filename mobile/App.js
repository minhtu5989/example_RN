import React from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, UIManager } from 'react-native';
import { UtilityThemeProvider, Box } from 'react-native-design-utility';
import { Provider, } from 'mobx-react/native';

import { store } from './src/stores';
import { theme } from './src/constants/theme'
import { Navigation } from './src/screens/index';
import { images, productImgs, categoryImgs  } from './src/constants/images';
import { cacheImages } from './src/utils/cacheImages'

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)
export default class App extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount(){
    this.cacheAssets()
  }

  cacheAssets = async () => {
    const imagesAssets = cacheImages([
      ...Object.values(images),
      ...Object.values(productImgs),
      ...Object.values(categoryImgs),
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

console.ignoredYellowBox = ['Unrecognized WebSocket', `Warning: Can't call setState`];