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
            <Box align='center' p='xs' m="3xs" bg='white' dir='row' h={150} w={width} f={1} >
                <Box >
                    <Image 
                        source={product.imageUrl}
                        style={{height: '90%', width: 100}} 
                        resizeMode='contain'
                    /> 
                </Box>
                <Box ml='sm' f={1}>
                    <Box>
                        <Text bold size='lg'> {product.name} </Text>
                        <Text left size="sm" bold>
                            ${product.price} each
                        </Text>
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
                <Box align='center' dir='col' f= {1}  >
                    <TouchableOpacity >
                        <Box h={35} w={45} center radius='sm' style={{borderWidth:1, borderColor:theme.color.myAppColorLighter}}>
                            <Text>{product.cartQty}</Text>
                        </Box>
                    </TouchableOpacity>
                    <Box mt='xs'>
                        <Text>${product.totalPrice }</Text>
                    </Box>
                </Box>
                
            </Box>
        );
    }
}

export default CartItem;