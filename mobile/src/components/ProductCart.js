import React, { PureComponent } from 'react';
import { Box, Text } from 'react-native-design-utility'

class ProductCart extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            txtPassword:''
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('name')
    });

    render() {
        return (
            <Box>
                <Text>ads </Text>
                
            </Box>
        );
    }
}

export default ProductCart;