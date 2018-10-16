import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';


export class Input extends Component {
    render() {
        return (
            <TextInput 
                {...this.props}
                style={[styles.textInput, this.props.style]}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput:{
        width: 300,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
});