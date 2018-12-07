import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {socket} from '../../components/SocketIO'
import { MyButton } from '../../commons/MyButton';
import { theme } from '../../constants/theme';
import { NavigationService } from '../../api/NavigationService';

class Messenger extends Component {
    static navigationOptions ={
        tabBarLabel: 'Messenger',
        tabBarIcon: ({ tintColor }) => 
            <MaterialCommunityIcons name='facebook-messenger' size={25} color={tintColor} /> 
    }
    render() {
        return (
            <Box f={1} bg='white' style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Box 
                        style={{
                            borderWidth: 1, borderRadius: 6, borderColor: '#42a5f5',
                            width: '95%', height:50, marginBottom: 30, 
                            backgroundColor: '#90caf9' 
                        }}
                    >
                        <MyButton onPress={ () => NavigationService.navigate('ChatRoom') }>
                            <Text color={theme.color.black} bold>Trò chuyện cùng Adam </Text>
                        </MyButton>
                    </Box>
            </Box>            
        );
    }
}

export default Messenger;
