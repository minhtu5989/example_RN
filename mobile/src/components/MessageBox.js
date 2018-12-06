import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { GiftedChat } from 'react-native-gifted-chat'

import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import {socket} from './SocketIO'
import { MyButton } from '../commons/MyButton';
import { theme } from '../constants/theme';

class MessageBox extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Admin',
        headerLeft: (
            <Box mr='xs'>
                <MyButton onPress={() => navigation.goBack(null)} >
                    <EvilIcons color={theme.color.white} size={32} name="close" />
                </MyButton>
            </Box>
        )
    });

    state = {
        messages: [],
        mess: ''
    }

    componentWillMount() {
    this.setState({
        messages: [
            {
                _id: '4',
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: '1',
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: '3',
                text: 'Hello developersadads',
                createdAt: new Date(),
                user: {
                    _id: '2',
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/ansday',
                },
            },
            {
                _id: '1',
                text: 'Hesadsadllo developer',
                createdAt: new Date(),
                user: {
                    _id: '3',
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/anyads',
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
    
    textInputProps(){
        returnKeyType:'send'
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
                <Box f={1} >
                    <GiftedChat
                        // showUserAvatar={true}
                        // keyboardShouldPersistTaps={'never'}
                        isAnimated={true}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 12,
                        }}ß
                        textInputProps={{
                            returnKeyType:'send',
                            underlineColorAndroid:'transparent',
                            // style:{borderRadius: 6, borderColor: theme.color.greenLightest, borderWidth: 1,}
                            // value: this.state.mess,
                            // onChangeText: mess => this.setState({mess}), 
                            // onSubmitEditing: ( () => this.onSend(this.state.mess))
                        }}
                    />
                    
                </Box>
                
            </Box>            
        );
    }
}

export default MessageBox;
