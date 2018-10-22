import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';

import { images } from "../constants//images";
import { NavigationService } from '../api/NavigationService'

class ShoppingCartIcon extends Component {
    hendlePress(){
        NavigationService.navigate('ShoppingCart')
    }
    render() {
        return (
            <TouchableOpacity style={{flex:1}} onPress={this.hendlePress}>
                <Box mr='sm'>
                    <Image 
                        source={images.shoppingCart}
                        resizeMode='contain'
                        style={{width: 25}}
                    />
                </Box>
            </TouchableOpacity>         
        );
    }
}

export default ShoppingCartIcon;