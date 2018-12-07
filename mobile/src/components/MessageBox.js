import React, { Component } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { GiftedChat } from 'react-native-gifted-chat'
import { inject } from 'mobx-react/native';
import { Notifications } from 'expo';

import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import {socket} from './SocketIO'
import { MyButton } from '../commons/MyButton';
import { theme } from '../constants/theme';
import { registerForPushNotificationsAsync } from '../api/registerForPushNotificationsAsync';
import { PushNotification } from '../api/PushNotification';

@inject('authStore')
class MessageBox extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Chat room',
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
        notification: {},
    }
    
        _handleNotification = (notification) => {
            this.setState({notification: notification});
        };

    componentWillMount() {
        registerForPushNotificationsAsync(this.props.authStore.info)
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        //fetch data
    }

    onSend = async(messages) => {
        await socket.emit('CHAT_SEX', messages)
    }
    
    componentDidMount = async() => {
        await socket.on('SERVER_REPLY', mess => {
            PushNotification(this.props.authStore.info, mess)
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, mess),
            }))
        })
    }
    
    render() {
        const { info } = this.props.authStore
        return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
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
                                // autoFocus: true,
                                returnKeyType:'send',
                                underlineColorAndroid:'transparent',
                            }}
                        />
                        {/* <Text>Origin: {this.state.notification.origin}</Text>
                        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
                    </Box>
                </TouchableWithoutFeedback>
        );
    }
}

export default MessageBox;
