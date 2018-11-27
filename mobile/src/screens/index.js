import React, { Component } from 'react'
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { NavigationService } from '../api/NavigationService';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';

import ShoppingCartIcon from '../components/ShoppingCartIcon';
import { theme } from "../constants/theme";

const primaryHeader = { 
    headerStyle: {
        backgroundColor: theme.color.myAppColor,
        // height: Platform.OS === 'ios' ? 50 : 60,
        paddingBottom: Platform.OS === 'ios' ? 16 : 0,
    },
    headerTintColor: theme.color.white,
    headerTitleStyle:{ 
        // fontWeight: '400', 
        fontSize: 22, 
    },
}

const modelHeader = {
    headerBackTitle: null,
    headerTintColor: theme.color.white,
    headerStyle: {
        backgroundColor: theme.color.myAppColor,
        paddingBottom: Platform.OS === 'ios' ? 16 : 0,
    },
    headerTitleStyle: {
        fontWeight: '700', 
        color: theme.color.white,
    },
}

const AuthNavigator = createStackNavigator(
    {
        Login: {
            getScreen: () => require('./Settings/LoginScreen').default,
        },
    },
    {
        navigationOptions:{
            header: null
        }
    }
)

const ShopppingCartStack = createStackNavigator(
    {
        ShoppingCart: {
            getScreen: () => require('./Products/ShoppingCartScreen').default,
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
            getScreen: () => require('./Settings/ProfileScreen').default,
        },
        Settings: {
            getScreen: () => require('./Settings/SettingScreen').default,
        },
        Addresses: {
            getScreen: () => require('./Addresses/AddressesScreen').default,
        },
    },
    { 
        navigationOptions: {
            ...modelHeader,
        }
    }
)

const AddressesFormStack = createStackNavigator(
    {
        AutoCompleteAddress: {
            getScreen: () => require('./Addresses/AutoCompleteAddressScreen').default,
        },
        EditAddress: {
            getScreen: () => require('./Addresses/EditAddressScreen').default,
        },
        CreateAddress: {
            getScreen: () => require('./Addresses/CreateAddressScreen').default,
        },
    },
    {  
        navigationOptions: {
            ...modelHeader,
        }
    }
)


const HomeStack = createStackNavigator(
    {
        Home: {
            getScreen: () => require('./Tabs/HomeScreen').default,
        },
        Category: {
            getScreen: () => require('./Products/CategoryScreen').default,
        },
        ShoppingCart: {
            screen: ShopppingCartStack,
            navigationOptions:{ header: null,  }
        },
    },
    { 
        navigationOptions:{ 
            ...primaryHeader, 
            headerRight: <ShoppingCartIcon/> ,
        } 
    }
)
//tắt thanh tab Bar ở dưới trong màn hình ShoppingCart
HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = true
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
                height: 60,
                paddingBottom: 5,
                backgroundColor: theme.color.greyLightest,
                borderTopWidth: 0.3,
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
        Profile: ProfileStack,
        AddressesForm: AddressesFormStack,
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
            getScreen: () => require('./Settings/SplashScreen').default,
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
