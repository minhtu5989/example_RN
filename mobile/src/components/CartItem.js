import React, { Component } from 'react'
import { Box, Text, } from 'react-native-design-utility'
import { Image, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { observer } from 'mobx-react/native';


const {width, height} = Dimensions.get('window')
@observer
class CartItem extends Component {
    render() {
        const { product } = this.props
        return (
            <Box align='center' p='xs' m="3xs" bg='white' dir='row' h={150} w={width} >
                <Box f={0.3} >
                    <Image 
                        source={product.imageUrl}
                        style={{height: 70, width: 70}} 
                        resizeMode='contain'
                    /> 
                </Box>
                <Box m='lg' f={1}>
                    <Box>
                        <Text bold size='lg'> {product.name} </Text>
                        <Text color='greyDark' size='md'>At ${product.kgPrice}/kg </Text>
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={product.removeFromCart}>
                            <Box dir='row' align='center'>
                                <Feather size={theme.text.size.lg} name='trash-2' color={theme.color.myAppColor}/>
                                <Text size='md' color='greyDark' ml={5}>Remove</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box center mr='md'>
                    <TouchableOpacity >
                        <Box h={35} w={45} center radius='sm' style={{borderWidth:1, borderColor:theme.color.myAppColorLighter}}>
                            <Text>{product.cartQty}</Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
                <Box>
                    <Text>${product.totalPrice }</Text>
                </Box>
            </Box>
        );
    }
}

export default CartItem;