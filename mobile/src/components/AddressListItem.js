import React, { Component } from 'react'
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import Swipeout from 'react-native-swipeout';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'

import { theme } from '../constants/theme';
@observer
export class AddressListItem extends Component {
    
    @observable activeRowKey = null

    render() {
        const { address, index, data, info, parentFlatlist } = this.props
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.activeRowKey != null){
                    this.activeRowKey = null
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.activeRowKey = address._id 
            },
            right: [  
                {
                    onPress: () => {
                        Alert.alert(
                            'Are you sure?',
                            '',
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        await info.removeAddress(address._id);
                                        data.splice(index, 1)
                                        parentFlatlist.refreshFlatlist(address._id)
                                    },
                                },
                                
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
            
                            ],
                            { cancelable: true },
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: index
        }
        return (
            <Swipeout {...swipeSettings}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 16,
                        height: 70,
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
            // </Swipeout>
        );
    }
}
