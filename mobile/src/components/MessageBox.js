import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { GiftedChat } from 'react-native-gifted-chat'
import { inject } from 'mobx-react/native';
import { Notifications } from 'expo';

import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import {socket} from './SocketIO'
import { MyButton } from '../commons/MyButton';
import { theme } from '../constants/theme';
import { registerForPushNotificationsAsync } from '../api/registerForPushNotificationsAsync';

@inject('authStore')
class MessageBox extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Chat chit',
        headerLeft: (
            <Box mr='xs'>
                <MyButton onPress={() => navigation.goBack(null)} >
                    <EvilIcons 
                        color={theme.color.white} size={32} name="close" 
                        onPress={() => navigation.goBack(null)} 
                    />
                </MyButton>
            </Box>
        )
    });

    state = {
        messages: [],
        mess: '',
        notification: {},
    }
    
        _handleNotification = (notification) => {
            this.setState({notification: notification});
        };

    componentWillMount() {
        registerForPushNotificationsAsync(this.props.authStore.info)
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        //fetch data
        console.log('Origin:', this.state.notification3.origin);
        console.log('Data:', this.state.notification.data);        
    }

    onSend(messages) {
        socket.emit('CHAT_SEX', messages)
        console.log('Messages:', messages);
    }

    componentDidMount() {
        socket.on('SERVER_REPLY', mess => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, mess),
            }))
        })
    }
    
    render() {
        const { info } = this.props.authStore
        return (
            <Box f={1}>000
                <Box f={1} >
                    <GiftedChat
                        showUserAvatar={true}
                        keyboardShouldPersistTaps={'never'}
                        isAnimated
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: info._id,
                            name: info.firstName,
                            avatar: info.avatarUrl,
                        }}
                        textInputProps={{
                            autoFocus: true,
                            returnKeyType:'send',
                            underlineColorAndroid:'transparent',
                        }}
                    />
                    
                </Box>
                
            </Box>            
        );
    }
}

export default MessageBox;
