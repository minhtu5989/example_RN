import React, { Component } from 'react'
import {
    Alert,
	StyleSheet,
	TouchableOpacity,
    TouchableHighlight,
    FlatList
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';
import { SwipeListView } from 'react-native-swipe-list-view';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from 'mobx'

import { MyButton } from '../commons/MyButton';
import AddressListItem from './AddressListItem';

@inject('authStore')
@observer

export class AddressFlatList extends Component {

    @observable
    data = this.props.data

    @action.bound
    deleteRow(rowMap, rowKey) {
        try {
            Alert.alert(
                'Are you sure?',
                '',
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            this.closeRow(rowMap, rowKey);
                            const _id = this.data.findIndex(item => item._id === rowKey);
                            await this.props.authStore.info.removeAddress(_id);
                            const newData = [...this.data];
                            const prevIndex = this.data.findIndex(item => item._id === rowKey);
                            newData.splice(prevIndex, 1);
                            this.data = newData
                            console.log('newData', newData);
                            
                        },
                    },
                    
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },

                ],
                { cancelable: true },
            );
        } catch (error) {
            console.log('error', error);
        }
    }

    render() {
        return (
                <FlatList 
                    // onScroll={this.handleScroll}
                    data={this.data} 
                    renderItem={({item}) => <AddressListItem address={item} />} 
                    keyExtractor={ (item) => String(item._id) } 
                />
        );
    }
}
