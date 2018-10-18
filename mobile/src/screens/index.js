import React, { Component } from 'react'
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { NavigationService } from '../api/NavigationService';


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

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            getScreen: () => require('./Tabs/HomeScreen').default,
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
            showIcon: true, 
            activeTintColor: 'blue', 
            // pressColor: 'white',
            inactiveTintColor: 'black',
            showLabel: true,
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
            headerStyle:{
                backgroundColor: 'green'
            }
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
