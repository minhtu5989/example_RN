import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

import { theme } from '../constants/theme';
import { NavigationService } from '../api/NavigationService';

import { observer } from 'mobx-react/native';
@observer
export class AddressListItem extends Component {

    render() {
        const {address} = this.props
        return (
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 16,
                        height: 80,
                        justifyContent: 'center',
                        borderBottomWidth: StyleSheet.hairlineWidth, 
                        borderBottomColor: theme.color.grey,
                        backgroundColor: theme.color.white,
                        flex:1
                    }}
                >
                            <Text color={theme.color.black} size='sm' alignSelf= 'flex-start' >
                                {address.street}, {address.town}, {address.city}, {address.province}, Việt Nam
                            </Text>     
                </TouchableOpacity>
        );
    }
}
