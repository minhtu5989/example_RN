import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';
import { inject } from 'mobx-react/native';

import { MyButton } from '../commons/MyButton';
import { CloseBtn } from "../commons/CloseBtn";
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import AddressesForm from '../components/AddressesForm';
import { action, } from 'mobx';

// import { inject, observer } from 'mobx-react/native';

@inject('authStore')

class CreateAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Create Address',
        headerLeft: (
            <Box ml='xs'>
                <MyButton 
                    onPress={() => navigation.dismiss()} 
                >
                    <EvilIcons color={theme.color.myAppColor} size={24} name="close" />
                </MyButton>
            </Box>
            
        )
    });

    // @action.bound
    // async save(address) {
    //     try {
    //         await this.props.authStore.info.createAddress(address)   
    //         this.props.navigation.dismiss()
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // }

    render() {
        return (
            <Box f={1} bg='white'>
                <AddressesForm 
                    navigation={this.props.navigation} 
                    address={this.props.navigation.getParam('address')}
                    // save={this.save}
                />
            </Box>
        );
    }
}

export default CreateAddressScreen;
