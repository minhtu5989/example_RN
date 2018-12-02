import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { FlatList } from 'react-native'
import { Notifications } from 'expo';
import { inject } from 'mobx-react/native';

import CategoryCard from '../../components/CategoryCard';
import { theme } from "../../constants/theme";
import DealCarousel from '../../components/DealCarousel';
import { ProfileBtn } from "../../commons/ProfileBtn";
import { registerForPushNotificationsAsync } from '../../../src/api/registerForPushNotificationsAsync';

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
 
@inject('authStore')

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'In Store',
        headerLeft: (
            <ProfileBtn/>
        )
    });

    state = {
        notification: {},
    };

    componentDidMount() {
        registerForPushNotificationsAsync(this.props.authStore.info._id)
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
    this.setState({notification: notification});
    };

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
            
                <Box w='100%' h={220} bg='black' center>
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

                <Box style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Origin: {this.state.notification.origin}</Text>
                    {console.log('Origin:',this.state.notification.origin)}
                    
                    <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
                </Box>
            </Box>            
        );
    }
}

export default HomeScreen;