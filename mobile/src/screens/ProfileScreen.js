import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import CloseBtn from '../commons/CloseBtn';

class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'My Profile',
        headerLeft: <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    });

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle="dark-content"/>
                <Text>This is ProfileScreen</Text>
            </Box>            
        );
    }
}

export default ProfileScreen;