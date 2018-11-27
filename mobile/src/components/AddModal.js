import React, { Component } from 'react'
import { 
    Dimensions, 
    Alert,
    Platform,
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '../constants/theme';
import Modal from 'react-native-modalbox';

import { MyButton } from '../commons/MyButton';

let screen = Dimensions.get('window')

export default class AddModal extends Component {
    constructor(props) {
        super(props);
    }

    showAddModal(){
        this.refs.myModal.open()
    }

    render() {
        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 300
                }}
                position='center'
                backdrop={true}
                onClosed={ () => { } } 
            >
                <Text>New Address Infomation</Text>
            </Modal>
        );
    }
}
