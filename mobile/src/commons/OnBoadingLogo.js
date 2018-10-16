import { Image } from 'react-native';
import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';

import { images } from '../constants/images';


export class OnBoadingLogo extends Component {
    render() {
        return (
            <Box f={1} center bg='white'>
                <Box mb='sm'>
                    <Image source = {images.logo} />                    
                </Box>
                <Box mb='sm'>
                    <Text size='2xl'>
                        In <Text size='2xl' color='#2e7d32'>Store</Text>
                    </Text>
                </Box>
                <Text size='sm'>Easy grocery shopping.</Text>
            </Box>              
        );
    }
}