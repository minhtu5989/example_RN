import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FontAwesome } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'

import {socket} from '../../components/SocketIO'
import { MyButton } from '../../commons/MyButton';
class ListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) => 
                <FontAwesome name='list' size={25} color={tintColor} /> 
    };

    state = {
        messages: [],
    }

    componentWillMount() {
    this.setState({
        messages: [
        {
            _id: '1',
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: '2',
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ],
    })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    componentDidMount() {
        socket.on('SERVER_SEND_MESSAGE', mess => alert(mess))
    }
    

    render() {
        return (
            <Box f={1}>
                {/* <Box h={40} w={150}>
                    <MyButton 
                        type='success' 
                        onPress={() => 
                            socket.emit('CLIENT_SEND_MESSAGE', 'asdd')
                        } 
                    >
                        <Text>Send message</Text>
                    </MyButton>
                </Box> */}
                <Box h='90%' w='100%' >
                    <GiftedChat
                        // showUserAvatar={true}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                </Box>
                
            </Box>            
        );
    }
}

export default ListScreen;
