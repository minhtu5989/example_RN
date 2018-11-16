import React, { Component } from 'react'
import { Dimensions, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';

import { MyButton } from '../commons/MyButton';

// import { NavigationService } from '../api/NavigationService';
// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { inject, observer } from 'mobx-react/native';


class NewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'NewFile',
    });

    render() {
        return (
            <Box f={1} bg='white'>
                <StatusBar barStyle='dark-content'/>
                <Text>this is NewFile</Text>
            </Box>
        );
    }
}

export default NewFile;
