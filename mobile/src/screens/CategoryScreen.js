import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';

import ProductCart from '../components/ProductCart';

@inject('productsStore')

class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name', 'InStore'),
      });

    render() {
        const { data } = this.props.productsStore
        return (
            <Box>   
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* {
                        data.map(product => (
                            <ProductCart product={product} key={product.name}  />
                        )) */}
                    }
                    <Text>Item ??</Text>
                </ScrollView>
            </Box>
        );
    }
}

export default CategoryScreen;