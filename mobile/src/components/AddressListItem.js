import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '../constants/theme';
import { MyButton } from '../commons/MyButton';
import { NavigationService } from '../api/NavigationService';

import { observer } from 'mobx-react/native';
@observer
class AddressListItem extends Component {
    handlePress = () => {
        NavigationService.navigate('AutoCompleteAddress',{ 
            goToEdit: true,
            _id: this.props.address._id
        })
    }

    render() {
        const {address} = this.props
        return (
            <Box h={80} px='sm'
                style={{
                    justifyContent: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth, 
                    borderBottomColor: theme.color.grey,
                }}
            >
                <MyButton onPress={this.handlePress} style={{alignItems: 'flex-start'}}>
                        <Text color={theme.color.black} size='sm' >
                            {address.street}, {address.town}, {address.city}, {address.province}, Việt Nam
                        </Text>
                </MyButton>
            </Box>
        );
    }
}

export default AddressListItem;
