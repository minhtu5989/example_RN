import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box,Text } from 'react-native-design-utility'
import { FontAwesome, EvilIcons } from '@expo/vector-icons';

export class MyButton extends Component {
    getAdditionalStyle(){
        const { type } = this.props;
        switch (type) {
            case 'success':
                return { backgroundColor: '#25c73a', borderColor: '#3EA552', };
        
            case 'danger':
                return { backgroundColor: '#FF0000', borderColor: '#ff564e', };
    
            case 'warning':
                return { backgroundColor: '#ffb827' , borderColor: '#FFCC00', };
            
            case 'primary':
                return { backgroundColor: '#0099FF', borderColor: '#6aa3da', };

            case 'image': 
                return { backgroundColor: 'transparent', borderWidth: 0 }

            default:
                return { backgroundColor: 'transparent', borderWidth: 0 };
        }
    }
    
    render() {
        const { children, ref, style } = this.props;
        const additionalStyle = this.getAdditionalStyle();

        return  (
                <TouchableOpacity
                    {...this.props}  
                    ref={ref}
                    style={[ {height:'100%', width:'100%', alignSelf:'center', 
                            borderWidth: 1, borderRadius: 6,} ,additionalStyle, style]} 
                >
                    <Box center f={1}>
                        {children}
                    </Box>
                </TouchableOpacity>
        )
    }
}


