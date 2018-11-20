import React, { Component } from 'react'
import {
    Alert,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	View } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { inject, observer } from 'mobx-react/native';
import { observable, action } from 'mobx'

import { MyButton } from '../commons/MyButton';
import AddressListItem from './AddressListItem';

@inject('authStore')
@observer

export class AddressFlatList extends Component {
    constructor(props) {
        super(props);
		this.state = {
			sectionListData: Array(5).fill('').map((_,i) => ({title: `title${i + 1}`, data: [...Array(5).fill('').map((_, j) => ({key: `${i}.${j}`, text: `item #${j}`}))]})),
		};
    }

    @observable
    data = this.props.data

    closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	// deleteRow(rowMap, rowKey) {
	// 	const newData = [...this.data];
	// 	const prevIndex = this.data.findIndex(item => item.key === rowKey);
	// 	newData.splice(prevIndex, 1);
    //     this.setState({data: newData});
        
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
                        await this.props.authStore.info.removeAddress(rowKey);
                        const newData = this.data
                        const prevIndex = this.data.findIndex(item => item._id === rowKey);
                        this.newData.splice(prevIndex, 1);
                        this.data = newData
                        console.log('this.data',this.data.toJSON());
                        console.log('index',prevIndex);
                        
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

	// deleteSectionRow(rowMap, rowKey) {
	// 	this.closeRow(rowMap, rowKey);
	// 	var [section, row] = rowKey.split('.');
	// 	const newData = [...this.state.sectionListData];
	// 	const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
	// 	newData[section].data.splice(prevIndex, 1);
	// 	this.setState({sectionListData: newData});
	// }

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
		setTimeout(() => {
			this.closeRow(rowMap, rowKey);
		}, 5000);
    }

    render() {
        return (
            <Box bg='white' f={1}>
                
                <SwipeListView
                    useFlatList
                    data={this.data}
                    keyExtractor={item => item._id} 
                    renderItem={ ({item}, rowMap) => (
                        <TouchableHighlight
                            onPress={ () => console.log('You touched me') }
                            style={styles.rowFront}
                            underlayColor={theme.color.blueLighter}
                        >
                                <AddressListItem address={item} />
                        </TouchableHighlight>
                    )}
                    renderHiddenItem={ ({item}, rowMap) => (
                        <Box style={styles.rowBack}>
                            <Text>Left</Text>
                            <TouchableOpacity 
                                style={[styles.backRightBtn, styles.backRightBtnLeft]} 
                                onPress={ () => this.closeRow(rowMap, item._id) }
                            >
                                <Text color={theme.color.white}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.backRightBtn, styles.backRightBtnRight]} 
                                onPress={ () => this.deleteRow(rowMap, item._id) }
                            >
                                <Text color={theme.color.white}>Delete</Text>
                            </TouchableOpacity>
                        </Box>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={this.onRowDidOpen}
                />

            </Box>
        );
    }
}

const styles = StyleSheet.create({
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});
