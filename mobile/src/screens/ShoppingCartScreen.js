import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { inject } from 'mobx-react/native';


@inject('shoppingCartStore')

class ShoppingCartScreen extends Component {
    static navigationOptions = {
        title: 'My cart'
    };

    renderList(){
        const { products } = this.props.shoppingCartStore

        if(products.length === 0 )
            return(
                <Box>
                    <Text>Cart Empty</Text>
                </Box>
            )
        return products.map( product => 
            <Box key={product._id} dir='row' center>
                <Text mr='sm'>{product.name}</Text>
                <Text>Quatity: {product.cartQty}</Text>
            </Box>
        )
    }

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle='dark-content'/>
                {this.renderList()}
            </Box>            
        );
    }
}

export default ShoppingCartScreen;