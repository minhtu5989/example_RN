import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box,Text } from 'react-native-design-utility'
import { FontAwesome, EvilIcons } from '@expo/vector-icons';

export class MyButton extends Component {
    getAdditionalStyle(){
        const { type } = this.props;
        switch (type) {
            case 'success':
                return { backgroundColor: "#25c73a", borderColor: '#3EA552', borderWidth: 1};
        
            case 'danger':
                return { backgroundColor: "#ff564e", borderColor: '#FF0000', borderWidth: 1 };
    
            case 'warning':
                return { backgroundColor: "#ffb827", borderColor: '#FFCC00', borderWidth: 1 };
            
            case 'primary':
                return { backgroundColor: "#6aa3da", borderColor: '#0099FF', borderWidth: 1 };

            case 'image': 
                return { backgroundColor: 'transparent' }

            default:
                return { borderWidth: 0 };
        }
    }
    render() {
        const { children, ref} = this.props;
        const additionalStyle = this.getAdditionalStyle();
        return  <TouchableOpacity
                    {...this.props}     
                    ref={ref}
                    style={[ {height:'100%', width:'100%', alignSelf:'center'} ,additionalStyle, this.props.style]} 
                >
                    <Box center f={1} center>
                        {children}
                    </Box>
                </TouchableOpacity>
    }
}
