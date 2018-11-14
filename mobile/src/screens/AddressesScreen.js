import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar, Dimensions, ScrollView, ActivityIndicator} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action } from 'mobx'

import { theme } from '../constants/theme';
import { MyButton } from '../commons/MyButton';

const {width} = Dimensions.get('window')

@inject('authStore')
@observer

class AddressesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const headerRight = navigation.getParam('showAddBtn') 
        ?
        <Box mr='xs'>
            <MyButton onPress={navigation.getParam('handleAddressesPress')} >
                <Text color={theme.color.green}>Add</Text>
            </MyButton>
        </Box>
        : 
        null
        return {
            title: 'Address',
            headerRight 
        }
        
    }

    @observable isLoading = false

    componentDidMount() {
        this.fetchAddresses()
    }

    @action.bound
    async fetchAddresses() {
        try {
            this.isLoading = true
            await this.props.authStore.info.getAddresses()

            setTimeout(() => {
                this.setAddBtn()
            }, 1000);

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
                <Box w={width - 48} h={40}>
                    <MyButton type='success' onPress={this.handleAddressesPress}>
                        <Text>Add address</Text>
                    </MyButton>
                </Box> 
            </Box>
        </Box>
    )


    render() {
        if(this.isLoading)
        {
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.green} size='large' />
                </Box>
            )
        }

        if(this.props.authStore.info.addressesIsEmpty){
            return this.renderIfEmpty();
        }

        return ( 
            <Box f={1} center bg='white'>
                <StatusBar barStyle='dark-content'/>
                <ScrollView>
                    {this.props.authStore.info.addresses.map(address => (
                        <Box key={address._id}>
                                <Text>{address.street}, {address.town} {address.city}, {address.province}, Việt Nam</Text>
                        </Box>
                    ))}
                </ScrollView>

            </Box>            
        );
    }
}

export default AddressesScreen;