import React from 'react';
import { ActivityIndicator } from 'react-native';
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility';
import { Provider } from 'mobx-react/native';

import { store } from './src/models';
 import { theme } from './src/constants/theme'
import { Navigation } from './src/screens/index';
import { images } from './src/constants/images';
import { cacheImages } from './src/utils/cacheImages'

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount(){
    this.cacheAssets()
  }

  cacheAssets = async() => {
    const imagesAssets = cacheImages(Object.values(images));
    await Promise.all([...imagesAssets])
    this.setState({isReady: true})
  }

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
          <Navigation/>
        </UtilityThemeProvider>
      </Provider>
    );
  }
}
