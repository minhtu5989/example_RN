import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

class ShoppingCartScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='list' size={25} color={tintColor} /> 
    };

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle="light-content"/>
                <Text>This is ShoppingCartScreen</Text>
            </Box>            
        );
    }
}

export default ShoppingCartScreen;