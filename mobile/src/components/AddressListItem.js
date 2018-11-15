import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '../constants/theme';
import { MyButton } from '../commons/MyButton';
import { NavigationService } from '../api/NavigationService';

// import { inject, observer } from 'mobx-react/native';

class AddressListItem extends Component {
    handlePress = () => {
        NavigationService.navigate('EditAddress')
    }

    render() {
        const {address} = this.props
        return (
            <MyButton onPress={this.handlePress}>
                <Box h={50} w={'100%'} px='sm' f={1}
                    style={{
                        justifyContent: 'center',
                        borderBottomWidth: StyleSheet.hairlineWidth, 
                        borderBottomColor: theme.color.grey
                    }}
                >
                    <Text color={theme.color.myAppColor}>
                        {address.street}, {address.town}, {address.city}, {address.province}, Việt Nam
                    </Text>
                </Box>
            </MyButton>
        );
    }
}

export default AddressListItem;
