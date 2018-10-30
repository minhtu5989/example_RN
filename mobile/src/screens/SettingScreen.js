import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar, ScrollView } from 'react-native';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

import { ListColumn } from "../commons/ListColumn";

const baseIcon = {
    size: 25,
    color: theme.color.grey,
  };
  
  const LINKS = [
    {
      link: 'EditUserInfo',
      title: 'Your name and email',
      icon: <EvilIcons name="user" {...baseIcon} />,
    },
    {
      link: 'Addresses',
      title: 'Addresses',
      icon: <EvilIcons name="location" {...baseIcon} />,
    }
  ];

class SettingScreen extends Component {
    static navigationOptions = {
        title: 'Account Setting'
    }
    render() {
        return (
            <Box f={1} bg='white'>
                <StatusBar barStyle='dark-content'/> 
                <ScrollView>
                    {LINKS.map(el => (
                        <ListColumn link={el.link} key={el.title}>
                        <ListColumn.Left>
                            <Box dir="row" align="center">
                                <Box f={0.2}>{el.icon}</Box>

                                <Box f={1}>
                                    <Text>{el.title}</Text>
                                </Box>
                            </Box>
                        </ListColumn.Left>
                        <ListColumn.Right>
                            <MaterialIcons name="keyboard-arrow-right" {...baseIcon} />
                        </ListColumn.Right>
                        </ListColumn>
                    ))}
                </ScrollView>
            </Box>            
        );
    }
}

export default SettingScreen;