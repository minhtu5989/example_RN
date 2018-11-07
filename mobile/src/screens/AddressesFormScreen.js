 import React, { Component } from 'react'
import { Dimensions, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { theme } from '../constants/theme';
// import { MyButton } from '../commons/MyButton';
import { observer } from 'mobx-react/native';
import { observable, action } from 'mobx';

import { CloseBtn } from "../commons/CloseBtn";
import Input from '../commons/Input';
import { theme } from '../constants/theme';
import { MyButton } from "../commons/MyButton";
import { buildAddress } from '../utils/buildAddress';


@observer

class AddressesFormScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Address',
    });

    @observable steetName=''

    @observable town=''

    @observable city=''

    @observable province=''

    @observable country=''

    @observable address=''

    @action.bound
    searchAddress = () => {
        const address = this.props.navigation.state.params.address;
        this.steetName = address.street
        this.town = address.town
        this.city = address.city
        this.province = address.province
        this.country = address.country
        this.address = address
    }

    render() {
        
        return (
            <Box f={1} bg='white' p='sm'>
                <StatusBar barStyle='dark-content'/>
                {this.searchAddress()}
                <ScrollView>
                    <Box mb='sm'>
                        <Input 
                            placeholder='Steet Address' 
                            value={this.steetName}
                        />
                        <Box dir='row'>
                            <Box f={1}>
                                <Input placeholder='Town' value={this.town}/>
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                                <Input placeholder='City' editable={false} value={this.city}/>
                            </Box>
                        </Box>

                        <Box dir='row'>
                            <Box f={1}>f
                                <Input placeholder='Province' editable={false} value={this.province}/>
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                                <Input placeholder='Country' editable={false} value={this.country}/>
                            </Box>
                        </Box>
                        <Input placeholder='Instructions for delivery (optional)' containerStyle={{height: 100}} />                        
                    </Box>
                    <MyButton 
                        type='success'
                        style={{height: 50}}
                    >
                        <Text bold color="white">
                            Save
                        </Text>
                    </MyButton>
                </ScrollView>
            </Box>
        );
    }
}



export default AddressesFormScreen;

 