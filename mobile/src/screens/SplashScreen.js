import React, { Component } from 'react'

import { OnBoadingLogo } from '../commons/OnBoadingLogo'

class SplashScreen extends Component {
    componentDidMount(){
        this.checkAuth()
    }

    checkAuth(){
        setTimeout(() => {
            this.props.navigation.navigate('Auth');
        }, 1000);
    }

    render() {
        return (
            <OnBoadingLogo/>           
        );
    }
}

export default SplashScreen;