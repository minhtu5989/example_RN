import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FontAwesome } from '@expo/vector-icons';

class ListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='list' size={25} color={tintColor} /> 
    };

    render() {
        return (
            <Box f={1} center>
                <Text>List Screenn</Text>
            </Box>            
        );
    }
}

export default ListScreen;
