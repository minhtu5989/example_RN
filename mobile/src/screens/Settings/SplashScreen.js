import React, { Component } from 'react'
import { inject } from "mobx-react/native";

import { OnBoadingLogo } from '../../commons/OnBoadingLogo'

@inject('authStore')
 
class SplashScreen extends Component {
    componentDidMount(){
        this.checkAuth()
    }

    checkAuth = () => {
        setTimeout( async() => {
            await this.props.authStore.setupAuth()
        }, 1000 );
    }

    render() {
        return (
            <OnBoadingLogo/>           
        );
    }
}

export default SplashScreen;