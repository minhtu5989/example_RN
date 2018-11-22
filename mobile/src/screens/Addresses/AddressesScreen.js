import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { 
    StatusBar, 
    Dimensions, 
    ScrollView, 
    FlatList,
    ActivityIndicator, 
    StyleSheet,
    TouchableHighlight
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action, when } from 'mobx'

import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';
import { store } from "../../stores";

const {width} = Dimensions.get('window')

@inject('authStore')
@observer


class AddressesScreen extends Component {

    @observable isLoading = false
    @observable data = this.props.authStore.info.addressList


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
        when(
            () => !this.props.authStore.info.addressesIsEmpty,
            () => {
                setTimeout(() => {
                    this.setAddBtn()
                }, 1500); 
            }
        )
    }


    componentDidMount = () => {
        this.fetchAddresses();
    }

    @action.bound
    async fetchAddresses()  {
        try {
            this.isLoading = true
            const res = await this.props.authStore.info.getAddresses()
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

    renderSeparator = () => {
        <Box style={{
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth, 
            borderBottomColor: theme.color.grey,
        }} />
    }

    renderItem = (item) => {
        return (
            <Box h={80} px='sm' 
                style={{
                    justifyContent: 'center',
                    borderBottomWidth: StyleSheet.hairlineWidth, 
                    borderBottomColor: theme.color.grey,
                }}
                key= {item._id}
            >
                {/* <MyButton onPress={this.handlePress} style={{alignItems: 'flex-start'}}> */}
                        <Text color={theme.color.black} size='sm' alignSelf= 'flex-start' >
                            {item.street}, {item.town}, {item.city}, {item.province}, Việt Nam
                        </Text>
                {/* </MyButton> */}
            </Box>
        )
    }

    render() {  
        const {info} = this.props.authStore

        if(this.isLoading && info.totalAddresses === 0)
        {
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.myAppColor} size='large' />
                </Box>
            )
        }

        if( info.totalAddresses === 0 ){
            return this.renderIfEmpty();
        }

        return (
            <Box f={1} bg='white'>
                <StatusBar barStyle="dark-content" />
             
            {/* <ScrollView>
                {
                    info.addresses.map(address => (
                        this.renderItem(address)
                    ))
                }
            </ScrollView> */}
            {console.log('data', info.addressList)}
         
                <FlatList 
                        data={info.addressList} 
                        renderItem={ ({item}) => <Text>{item._id}</Text> } 
                        keyExtractor={(item, index) => index} 
                        ItemSeparatorComponent={this.renderSeparator}
                        extraData={info.addresses} 
                    />

            </Box>
        )
    }
}

export default AddressesScreen;