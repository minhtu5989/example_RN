import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

class StoresScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Stores',
        tabBarIcon: ({ tintColor }) => 
                <MaterialIcons name='store' size={25} color={tintColor} /> 
    };

    render() {
        return (
            <Box f={1} center>
                <Text>This is Stores screen</Text>
            </Box>            
        );
    }
}

export default StoresScreen;