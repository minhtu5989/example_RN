import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import { images } from '../constants/images'

export class LoginButton extends Component {
    addType(){
        const {type} = this.props;
        switch(type){
            case 'google': 
                return 'googleBlue';
            case 'facebook': 
                return 'facebookBlue';
            default: 'white';
        }
    }
    render() {
        const { type, title } = this.props;
        return (
            <TouchableOpacity
                // onPress
                {...this.props}
            >
            <Box 
                dir='row' 
                align='center' 
                shadow={1} 
                bg={this.addType()}
                self='center' 
                p='2xs' 
                w={310} 
                radius='2xs'
                mb='sm'
            >
                <Box mr='md' >
                    <Box 
                        radius='xs' 
                        bg='white' 
                        h={32} 
                        w={32} 
                        center 
                        style={{ position:'relative' }}
                    >
                        {type  === 'google' && 
                            <Image source={images.googleColorIcon}/>
                        }
                        {type  === 'facebook' &&
                            <FontAwesome 
                                name='facebook' 
                                color='#4D6FA9' 
                                size={30}
                                style={{ position:'absolute', right:5, bottom:-3 }}
                            />
                        }
                    </Box>
                </Box>
                <Text size color='white'>
                    {title}
                </Text>
            </Box>
        </TouchableOpacity>
        );
    }
}

