import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';

import { MyButton } from '../commons/MyButton';

// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { inject, observer } from 'mobx-react/native';



class EditAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Address',
    });


    render() {
        return (
            <Box f={1} bg='white'>
                <Text>xxx</Text>
            </Box>
        );
    }
}

export default EditAddressScreen;
