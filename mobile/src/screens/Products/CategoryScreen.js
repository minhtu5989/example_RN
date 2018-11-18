import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';

import ProductCart from '../../components/ProductCart';

@inject('productsStore')

class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name', 'InStore'),
      });

    render() {
        const { productsStore } = this.props
        return (
            <Box>   
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        productsStore.data.map(product => (
                            <ProductCart product={product} key={product._id}  />
                        ))
                    }
                </ScrollView>
            </Box>
        );
    }
}

export default CategoryScreen;