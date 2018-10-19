import React, { Component } from 'react'
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { NavigationService } from '../api/NavigationService';
import { FontAwesome } from '@expo/vector-icons';

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

const primaryHeader = { 
    headerStyle: {
        backgroundColor: 'green'
    },
    headerTintColor: 'white',
    headerTitleStyle:{ fontWeight: '400' },
}

const HomeStack = createStackNavigator(
    {
        Home: {
            getScreen: () => require('./Tabs/HomeScreen').default,
        },
    },
    { navigationOptions: { ...primaryHeader }  }
)

const TabNavigator = createBottomTabNavigator(
    {
        Home: { 
            screen: HomeStack, 
            navigationOptions :{
                title: 'Home',
                tabBarIcon: ({ tintColor }) => 
                    <FontAwesome name='home' size={25} color={tintColor} />                
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
    },
    {
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
