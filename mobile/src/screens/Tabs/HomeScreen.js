import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FlatList } from 'react-native'

import CategoryCard from '../../components/CategoryCard';
import { theme } from "../../constants/theme";
import DealCarousel from '../../components/DealCarousel';
import { ProfileBtn } from "../../commons/ProfileBtn";

const NUMBER_COLUMN = 3;

const catagories = [
    {
        _id: 1,
        title: 'Grocery',
        image: require('../../../assets/img/cart.png')
    },
    {
        _id: 2,
        title: 'Drugs',
        image: require('../../../assets/img/drugs.png')
    },
    {
        _id: 3,
        title: 'Pets',
        image: require('../../../assets/img/pets.png')
    },
    {
        _id: 4,
        title: 'video games',
    }
]
 
class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'In Store',
        headerLeft: (
            <ProfileBtn/>
        )
    });

    _renderItem= ({item, index}) => {
        let styleItem = {};
        if(index % NUMBER_COLUMN !== 0) {
            styleItem.borderLeftWidth = 2;
            styleItem.borderLeftColor = theme.color.greyLighter;
        }
        return(
            <Box w={1/3} center h={120} bg='transparent' style={styleItem} >
                <CategoryCard item={item}/>
            </Box>
        )
    }

    keyExtractor = item => String(item._id)

    separator = () => <Box h={2} bg='greyLighter'/>

    render() {
        return (
            <Box f={1}>
                <Box w='100%' h={200} bg='black' center>
                    <DealCarousel/>
                </Box>
                <Box f={1} p={10}>
                    <FlatList
                        data={catagories}
                        renderItem={this._renderItem}
                        keyExtractor={this.keyExtractor}
                        numColumns={NUMBER_COLUMN}
                        ItemSeparatorComponent={this.separator}
                    />
                </Box>
            </Box>            
        );
    }
}

export default HomeScreen;