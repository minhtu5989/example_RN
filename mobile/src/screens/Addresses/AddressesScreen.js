import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { 
    StatusBar, 
    Alert,
    Dimensions, 
    StyleSheet, 
    ActivityIndicator, 
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action, when, reaction } from 'mobx'
import { SwipeListView } from 'react-native-swipe-list-view';

import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';

import { AddressListItem } from "../../components/AddressListItem";
const {width} = Dimensions.get('window')
@inject('authStore')
@observer

class AddressesScreen extends Component {

    @observable isLoading = false
    
    static navigationOptions = ({navigation}) => {
        const headerRight = navigation.getParam('showAddBtn') 
        ?
        <Box mr='xs'>
            <MyButton onPress={navigation.getParam('handleAddressesPress')} >
                <Text color={theme.color.myAppColor}>Add</Text>
            </MyButton>
        </Box>
        : 
        null
        return {
            title: 'Address',
            headerRight 
        }
        
    }
    constructor(props){
        super(props);
        //value 2 sẽ chạy chỉ 1 lần khi value 1 đúng  (when)

        when(
            () => !this.props.authStore.info.addressesIsEmpty,
            () => {
                setTimeout(() => {
                    this.setAddBtn()
                }, 1500); 
            }
        )

        //value 2 sẽ đc chạy mỗi lần value 1 đúng   (reaction)
        // reaction(
        //     () => !this.props.authStore.info.addressesIsEmpty,
        //     () => {
        //         this.setAddBtn()
        //     }
        // )
    }


    componentDidMount() {
        this.fetchAddresses();
    }

    @action.bound
    async fetchAddresses()  {
        try {
            this.isLoading = true
            await this.props.authStore.info.getAddresses()
            this.isLoading = false
        } catch (error) {
            throw error
        }
    }

    setAddBtn = () => {
        this.props.navigation.setParams({
            showAddBtn: true,
            handleAddressesPress: this.handleAddressesPress
        })
    }

    handleAddressesPress = () => {
        this.props.navigation.navigate('AutoCompleteAddress')
    }

    renderIfEmpty = () => (
        <Box f={1} center bg='white'>
            <StatusBar barStyle='dark-content'/>
            <Box  center px='md'>
                <Box center mb='md'>
                    <EvilIcons name='location' color={theme.color.black} size={200}/>
                </Box>         
                <Box center mb='md'>
                    <Text bold size='lg'>
                        Add address
                    </Text>
                    <Text bold size='sm' color={theme.color.grey}>
                        You haven't added an address yet !
                    </Text>                
                </Box>
                <Box w={width - 48} h={40} style={{justifyContent:'flex-end', marginBottom: 15}}>
                    <MyButton type='success' onPress={this.handleAddressesPress}>
                        <Text>Add address</Text>
                    </MyButton>
                </Box> 
            </Box>
        </Box>
    )

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

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
                        console.log('addressList',this.props.authStore.info.addressList);
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

    onRowDidOpen = (rowKey, rowMap) => {
        console.log('This row opened', rowKey);
        setTimeout(() => {
            this.closeRow(rowMap, rowKey);
        }, 5000);
    }

    renderFlatlist(){
        
        return (
            <Box bg='white' f={1}>
{        console.log('data', this.props.authStore.info.addressList)}  

                <SwipeListView
                    useFlatList
                    data={this.props.authStore.info.addressList}
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
        )
    }

    render() {
        if( this.props.authStore.info.totalAddresses === 0 ){
                    return this.renderIfEmpty();
                }

        if(this.isLoading && this.props.authStore.info.totalAddresses === 0)
        {
            
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.myAppColor} size='large' />
                </Box>
            )
        }

        
        return this.renderFlatlist()
    
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
    

export default AddressesScreen;

