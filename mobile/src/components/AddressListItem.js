import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '../constants/theme';
import { MyButton } from '../commons/MyButton';
// import { inject, observer } from 'mobx-react/native';

class AddressListItem extends Component {
    handlePress = () => {

    }

    render() {
        const {address} = this.props
        return (
            <MyButton onPress={this.handlePress}>
                <Box h={50} w={'100%'} px='sm' justify='center'
                    style={{
                        borderBottomWidth: StyleSheet.hairlineWidth, 
                        borderBottomColor: theme.color.grey
                    }}
                >
                    <Text>{address.street}</Text>
                </Box>
            </MyButton>
        );
    }
}

export default AddressListItem;
