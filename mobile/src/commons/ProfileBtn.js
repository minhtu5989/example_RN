import React, { Component } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Box,Text } from 'react-native-design-utility'

import HeaderBtn from './HeaderBtn';
import { NavigationService } from "../api/NavigationService";

export const ProfileBtn = () => {
    return (
        <HeaderBtn left onPress={() => NavigationService.navigate('Profile')} >
            <EvilIcons name="user" color="white" size={35} />
        </HeaderBtn>
    )
}
