import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
 
class HomeScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='home' size={25} color={tintColor} /> 
    };

    render() {
        return (
            <Box f={1} center >
                <StatusBar barStyle="light-content"/>
                <Text>This is Home screen</Text>
            </Box>            
        );
    }
}

export default HomeScreen;