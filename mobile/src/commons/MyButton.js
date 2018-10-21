import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box,Text } from 'react-native-design-utility'

export class MyButton extends Component {
    getAdditionalStyle(){
        const { type } = this.props;
        switch (type) {
            case 'success':
                return { backgroundColor: "#25c73a" };
        
            case 'danger':
                return { backgroundColor: "#ff564e" };
    
            case 'warning':
                return { backgroundColor: "#ffb827" };
            
            case 'primary':
                return { backgroundColor: "#6aa3da" };

            default:
                return { backgroundColor: 'white' };
        }
    }
    render() {
        const { children} = this.props;
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
        height:'100%', width:'100%',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'stretch'
    },
});