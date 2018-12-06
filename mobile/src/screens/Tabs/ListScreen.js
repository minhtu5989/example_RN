import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FontAwesome } from '@expo/vector-icons';
import {socket} from '../../components/SocketIO'
import { MyButton } from '../../commons/MyButton';
class ListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='list' size={25} color={tintColor} /> 
    };

    componentDidMount() {
        socket.on('SERVER_SEND_MESSAGE', mess => alert(mess))
    }
    

    render() {
        return (
            <Box f={1} center>
                <Box h={40} w={150}>
                    <MyButton 
                        type='success' 
                        onPress={() => 
                            socket.emit('CLIENT_SEND_MESSAGE', 'asdd')
                        } 
                    >
                        <Text>Send message</Text>
                    </MyButton>
                </Box>
                <Text>List Screenn</Text>
            </Box>            
        );
    }
}

export default ListScreen;
