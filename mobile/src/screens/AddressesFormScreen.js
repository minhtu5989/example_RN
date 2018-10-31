 import React, { Component } from 'react'
import { Dimensions, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { theme } from '../constants/theme';
// import { MyButton } from '../commons/MyButton';
// import { inject, observer } from 'mobx-react/native';

import { CloseBtn } from "../commons/CloseBtn";
import Input from '../commons/Input';
import { theme } from '../constants/theme';
import { MyButton } from "../commons/MyButton";


class AddressesFormScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Address',
        // headerLeft: <CloseBtn left size={25} onPress={() => navigation.goBack(null)} /> ,
    });

    render() {
        return (
            <Box f={1} bg='white' p='sm'>
                <StatusBar barStyle='dark-content'/>
                <ScrollView>
                    <Box mb='sm'>
                        <Input placeholder='Steet Address'/>
                        <Input placeholder='Apt # (optional)'/>
                        <Box dir='row'>
                            <Box f={1}>
                                <Input placeholder='Postal Code'/>
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                                <Input placeholder='City'/>
                            </Box>
                        </Box>
                        <Input placeholder='Instructions for delivery (optional)' containerStyle={{height: 100}} />                        
                    </Box>
                    <MyButton disabled type='disabled' style={{height: 50}}>
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

 