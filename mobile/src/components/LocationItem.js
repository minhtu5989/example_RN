import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';


class LocationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        console.log('location props', this.props);
        return (
            <Box 
                w='100%' 
                style={{
                    borderBottomWidth: StyleSheet.hairlineWidth, 
                    borderBottomColor: theme.color.greenLight
                }}
            >
                <Box p={10}>
                    <Text>{this.props.description}</Text>
                </Box>
            </Box>
        );
    }
}

export default LocationItem;
