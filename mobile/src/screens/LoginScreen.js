import React, { Component } from 'react'
import { Box } from 'react-native-design-utility'
import { Alert, Animated, Easing} from 'react-native';

import { OnBoadingLogo } from '../commons/OnBoadingLogo'
import { LoginButton } from '../commons/LoginButton';
import { FacebookApi} from '../api/Facebook'
import { GoogleApi} from '../api/Google'

const BoxAnimated = Animated.createAnimatedComponent(Box);

class LoginScreen extends Component {
    state={
        opacity: new Animated.Value(0),
        position: new Animated.Value(0),
    }

    componentDidMount(){
        const opacityButton = Animated.timing(
            this.state.opacity, 
            {
                toValue: 1,
                duration: 2000,
                delay: 300
            }
        )

        const positionAnim = Animated.timing(
            this.state.position, 
            {
                toValue: 1,
                duration: 2000, 
                // useNativeDriver: true,
                easing: Easing.bounce 
            }
        )

        Animated.parallel([positionAnim, opacityButton]).start();    

    }    

    async onPressGoogle(){ 
        try {
            const token = await GoogleApi.loginAsync();
            console.log('token', token);
        } catch (error) {
            console.log('error', error);            
        }
    }

    async onPressFacebook(){
        try {
            const token = await FacebookApi.loginAsync();
            console.log('token', token);
        } catch (error) {
            console.log('error', error);            
        }
    }

    render() {
        const { opacity } = this.state;
        const translateY = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0]
        })
        return (
            <Box f={1} center bg='white'>

                <BoxAnimated
                    f={1}
                    style={{
                        transform: [ {translateY} ]
                    }} 
                >
                    <Box f={1} center>
                        <OnBoadingLogo/>
                    </Box>
                </BoxAnimated>
                
                <BoxAnimated f={1} w='100%' style={{ opacity }}>
                        <LoginButton 
                            type='google' 
                            title='Continue with Google'
                            onPress={this.onPressGoogle}
                        />
                        <LoginButton 
                            type='facebook' 
                            title='Continue with Facebook'
                            onPress={this.onPressFacebook}
                        />
                </BoxAnimated>

            </Box>  
        );
    }
}

export default LoginScreen;