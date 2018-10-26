import React, { Component } from 'react'
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { NavigationService } from '../api/NavigationService';
import { FontAwesome } from '@expo/vector-icons';

import ShoppingCartIcon from '../components/ShoppingCartIcon';
import { theme } from "../constants/theme";
import { ProfileBtn } from '../commons/ProfileBtn';

const primaryHeader = { 
    headerStyle: {
        backgroundColor: theme.color.green
    },
    headerTintColor: 'white',
    headerTitleStyle:{ fontWeight: '400' },
}

const AuthNavigator = createStackNavigator(
    {
        Login: {
            getScreen: () => require('./LoginScreen').default,
        },
    },
    {
        navigationOptions:{
            header: null
        }
    }
)

const ShopppingCartNavigator = createStackNavigator(
    {
        ShoppingCart: {
            getScreen: () => require('./ShoppingCartScreen').default,
        },
    },
    {
        navigationOptions:  {
                headerStyle:{ backgroundColor: theme.color.white },
        }
    }
)

const ProfileStack = createStackNavigator(
    {
        Profile: {
            getScreen: () => require('./ProfileScreen').default,
        },
    },
    { 
        navigationOptions:{ 
            headerTitleStyle: {
                fontWeight: '400',
            }
        } 
    }
)

const HomeStack = createStackNavigator(
    {
        Home: {
            getScreen: () => require('./Tabs/HomeScreen').default,
        },
        Category: {
            getScreen: () => require('./CategoryScreen').default,
        },
        ShoppingCart: {
            screen: ShopppingCartNavigator,
            navigationOptions:{ header: null }
        },
    },
    { 
        navigationOptions:{ 
            ...primaryHeader, 
            headerRight: <ShoppingCartIcon/> ,
        } 
    }
)

HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true
    console.log('navigation', navigation);
    
    if(NavigationService.getCurrentRouteName(navigation.state) === 'ShoppingCart')
         { tabBarVisible = false }
    return { tabBarVisible }
}

const TabNavigator = createBottomTabNavigator(
    {
        Home: { 
            screen: HomeStack, 
            navigationOptions :{
                title: 'Home',
                tabBarIcon: ({ tintColor }) => 
                    <FontAwesome name='home' size={25} color={tintColor} />,
            }
        },
        List: {
            getScreen: () => require('./Tabs/ListScreen').default,
        },
        Stores: {  
            getScreen: () => require('./Tabs/StoresScreen').default,
        },
        Order: {
            getScreen: () => require('./Tabs/OrderScreen').default,
        },
    },
    {
        initialRouteName: 'Home',
        order: ['Home', 'Order', 'List', 'Stores'],
        animationEnabled: true,
        swipeEnabled: false,
        lazy: true,
        tabBarOptions: { 
            // pressColor: 'white',
            showIcon: true, 
            showLabel: true,
            labelStyle:{
                fontSize: 10,
                // fontFamily: 
                margin: 3
            },
            activeTintColor: 'blue', 
            inactiveTintColor: 'black',
            style:{
                backgroundColor: 'lightblue',
                borderTopWidth: 0.3,
                height: 50,
                borderTopColor:'gray',
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: -1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        },
    } 
)


const MainNavigator = createStackNavigator(
    {
        Tab: TabNavigator,
         Profile: ProfileStack
    },
    {
        mode: 'modal',
        navigationOptions:{
            header: null,
        }
    }
)

const AppNavigator = createSwitchNavigator(
    {
        Splash: {
            getScreen: () => require('./SplashScreen').default,
        },
        Auth: AuthNavigator,
        Main: MainNavigator,
    },{
        initialRouteName: 'Splash'
    }
)

export class Navigation extends Component {
    render() {
        return (
            <AppNavigator ref={ r => NavigationService.setTopLevelNavigator(r) } />
        );
    }
}
