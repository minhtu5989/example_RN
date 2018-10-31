import React, { Component } from 'react'
import { Dimensions, StatusBar } from 'react-native';
import { Box, Text } from 'react-native-design-utility'

// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { theme } from '../constants/theme';
// import { MyButton } from '../commons/MyButton';
// import { inject, observer } from 'mobx-react/native';

class NewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static navigationOptions = ({navigation}) => {
        title: 'New File'
    }

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle='dark-content'/>
                <Text>this is NewFile</Text>
            </Box>
        );
    }
}

export default NewFile;
