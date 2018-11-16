import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';
import { action, } from 'mobx';

import { MyButton } from '../commons/MyButton';
import { EvilIcons } from '@expo/vector-icons';
import AddressesForm from '../components/AddressesForm';
import { inject } from 'mobx-react/native';

 
@inject('authStore')

class EditAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Address',
        headerLeft: (
            <Box ml='xs'>
                <MyButton 
                    onPress={() => navigation.dismiss()} 
                    // style={{marginLeft: }}   
                >
                    <EvilIcons color={theme.color.myAppColor} size={24} name="close" />
                </MyButton>
            </Box>
            
        )
    });

    // @action.bound
    // async save(data) {
    //     try {
    //         const address = await this.props.navigation.getParam('address')
    //         await address.updateAddress(data)
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
                    editMode
                    address={this.props.navigation.getParam('address')}
                    // save={this.save}
                />
            </Box>
        );
    }
}

export default EditAddressScreen;
