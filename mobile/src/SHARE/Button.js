import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export class Button extends Component {
    getAdditionalStyle(){
        const { type } = this.props;
        switch (type) {
            case 'success':
                return { backgroundColor: "#25c73a", borderColor: '#3EA552' };
                break;
        
            case 'danger':
            return { backgroundColor: "#ff564e", borderColor: '#FF0000'  };
            break;
    
            case 'warning':
            return { backgroundColor: "#ffb827", borderColor: '#FFCC00' };
            break;
            
            case 'primary':
                return { backgroundColor: "#6aa3da", borderColor: '#0099FF' };
                break;
        
            default:
                return { backgroundColor: '#f000' };
                break;
        }
    }
    render() {
        const {title, onPress, type, children} = this.props;
        const additionalStyle = this.getAdditionalStyle();
        return (
            <TouchableOpacity 
                {...this.props}
                style={[styles.buttonContainer, additionalStyle, this.props.style]} 
            >
                {children}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent : 'center',
        height: 40,
        width: null
    }
});