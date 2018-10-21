import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility'
import ProductCart from '../components/ProductCart';

class CategoryScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('name')
    });

    render() {
        return (
            <Box>
                <ProductCart/> 
            </Box>
        );
    }
}

export default CategoryScreen;