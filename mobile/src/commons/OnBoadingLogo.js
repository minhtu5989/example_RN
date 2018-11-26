import { Image } from 'react-native';
import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';

import { images } from '../constants/images';
import { theme } from '../constants/theme';

export class OnBoadingLogo extends Component {
    render() {
        return (
            <Box f={1} center bg='white'>
                <Box mb='sm' shadow={3}>
                    <Image source = {images.logo} style={{height: 200, width: 200, borderRadius: 25}} />                    
                </Box>
                <Box mb='sm'>
                    <Text size='2xl' color={theme.color.myAppColor}>
                        Tu Luong
                    </Text>
                </Box>
                <Text size='sm' >Welcome to my Store !</Text>
            </Box>              
        );
    }
}