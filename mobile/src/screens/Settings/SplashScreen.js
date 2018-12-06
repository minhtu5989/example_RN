import React, { Component } from 'react'
import { inject } from "mobx-react/native";
import { Animated, Easing } from 'react-native';

import { OnBoadingLogo } from '../../commons/OnBoadingLogo'
import { Box } from 'react-native-design-utility';

const BoxAnimated = Animated.createAnimatedComponent(Box);
@inject('authStore')
 
class SplashScreen extends Component {
    state={
        position: new Animated.Value(0),
    }

    componentDidMount(){
        Animated.timing(
            this.state.position, 
            {
                toValue: 2,
                duration: 2000, 
                // useNativeDriver: true,
                easing: Easing.bounce 
            }
        ).start()

        this.checkAuth()
    }

    checkAuth = () => {
        setTimeout( async() => {
            await this.props.authStore.setupAuth()
        }, 2000 );
    }

    render() {
        const translateX = this.state.position.interpolate({
            inputRange: [0, 2],
            outputRange: [-450, 0]
        })
        return (
            <Box f={1} bg='white'>
                <BoxAnimated f={1} h='100%' 
                    style={{
                        transform: [ {translateX} ]
                    }} 
                >
                    <OnBoadingLogo/>           
                </BoxAnimated>
            </Box>
        );
    }
}

export default SplashScreen;