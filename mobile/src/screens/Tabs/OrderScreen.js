import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

class OrderScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Order',
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='cart-plus' size={25} color={tintColor} /> 
    };

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle="dark-content"/>
                <Text>This is Order screen</Text>
            </Box>            
        );
    }
}

export default OrderScreen;