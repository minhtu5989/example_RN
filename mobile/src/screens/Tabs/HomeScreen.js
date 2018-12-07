import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FlatList } from 'react-native'
import { inject } from 'mobx-react/native';

import CategoryCard from '../../components/CategoryCard';
import { theme } from "../../constants/theme";
import DealCarousel from '../../components/DealCarousel';
import { ProfileBtn } from "../../commons/ProfileBtn";
import { categoryImgs } from '../../constants/images';

const NUMBER_COLUMN = 2;

const catagories = [
    {
        _id: 1,
        title: 'Quần short',
        image: categoryImgs.quandui
    },
    {
        _id: 2,
        title: 'Quần dài',
        image: categoryImgs.quandai
    },
    {
        _id: 3,
        title: 'Áo khoát',
        image: categoryImgs.aokhoat
    },
    {
        _id: 4,
        title: 'Balo',
        image: categoryImgs.balo
    },
    {
        _id: 5,
        title: 'Mắt kính',
        image: categoryImgs.matkinh
    },
    {
        _id: 6,
        title: 'Đồng hồ',
        image: categoryImgs.dongho
    },
    {
        _id: 7,
        title: 'underwear',
        image: categoryImgs.aolot
    },
    {
        _id: 8,
        title: 'shoes',
        image: categoryImgs.giay
    }
]
 
@inject('authStore')

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'In Store',
        headerLeft: (
            <ProfileBtn/>
        )
    });

    _renderItem= ({item, index}) => {
        let styleItem = {
            borderBottomWidth: 4, 
            borderBottomColor: theme.color.greyLight,
        };
        if(index % NUMBER_COLUMN !== 0) {
            styleItem.borderLeftWidth = 4;
            styleItem.borderLeftColor = theme.color.greyLight;
        }
        return(
            <Box w={1/NUMBER_COLUMN} center h={200} bg='transparent' style={styleItem} >
                <CategoryCard item={item}/>
            </Box>
        )
    }

    keyExtractor = item => String(item._id)

    render() {
        return (
            <Box f={1} bg={theme.color.greyLight}>
            
                <Box w='100%' h={220} bg='black' center>
                    <DealCarousel/>
                </Box>

                <Box f={1} p={10}>
                    <FlatList
                        data={catagories}
                        renderItem={this._renderItem}
                        keyExtractor={this.keyExtractor}
                        numColumns={NUMBER_COLUMN}
                    />
                </Box>
            </Box>            
        );
    }
}

export default HomeScreen;