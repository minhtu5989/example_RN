import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { inject, observer } from 'mobx-react/native';

import CartItem from '../../components/CartItem';
import { theme } from '../../constants/theme';
import CloseBtn from '../../commons/CloseBtn';
import { NavigationService } from '../../api/NavigationService';

const {width} = Dimensions.get('window')


@inject('shoppingCartStore')
@observer
class ShoppingCartScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'My cart',

        headerTitleStyle: {
            fontWeight: '700', 
            color: theme.color.white,
        },
        headerStyle: {
            backgroundColor: theme.color.myAppColor,
            paddingBottom: Platform.OS === 'ios' ? 16 : 0,
        },
        
        headerLeft: 
            <CloseBtn 
                left 
                color={theme.color.white} 
                onPress ={ NavigationService.back }
                // onPress={() => navigation.goBack(null)} 
                style={{marginBottom: 16}} 
            />
    }); 

    renderList(){
        const { shoppingCartStore } = this.props

        if(shoppingCartStore.totalProducts === 0 )
            return(
                <Box center f={1}>
                    <Text>Cart Empty</Text>
                </Box>
            )
        return(
            <Box f={1}>
                <FlatList 
                    data={shoppingCartStore.productsList} 
                    renderItem={({item}) => 
                        <CartItem product={item}/>
                    } 
                    keyExtractor={(item) => String(item.id)} 
                    extraData={shoppingCartStore}    
                />
            </Box>
        )
    }

    renderCheckout(){
        const { shoppingCartStore } = this.props 
        if(shoppingCartStore.totalProducts === 0)
            return null;
        return (
            <Box bg='white' p='xs' w={width}>
                <TouchableOpacity >
                    <Box h={50} center radius='xs' bg='blue' position='relative'>
                        <Text bold color='white'>Check out</Text>
                        <Box position='absolute' bg='blueDark' radius='xs' center p='xs' style={{right: theme.space.xs}} >
                            <Text color='white' size='xs'>${shoppingCartStore.totalAmount}</Text>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </Box>
        )
    }

    render() {
        return (
            <Box f={1} center>
                <StatusBar barStyle='dark-content'/>
                {this.renderList()}
                {this.renderCheckout()}
            </Box>            
        );
    }
}

export default ShoppingCartScreen;