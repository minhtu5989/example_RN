import React, { Component } from 'react'
import { Box } from 'react-native-design-utility'
import { Alert, Animated, Easing, Dimensions} from 'react-native';
import { inject,observer } from "mobx-react/native";

import { OnBoadingLogo } from '../../commons/OnBoadingLogo'
import { LoginButton } from '../../commons/LoginButton';
import { FacebookApi} from '../../api/Facebook'
import { GoogleApi} from '../../api/Google'

const screen = Dimensions.get('window')
const BoxAnimated = Animated.createAnimatedComponent(Box);
@inject('authStore')
@observer
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

    onPressGoogle = async() =>{ 
        try {
            const token = await GoogleApi.loginAsync();
            
            await this.props.authStore.login(token, 'GOOGLE')
        } catch (error) {
            console.log('error', error);            
        }
    }

    onPressFacebook = async() =>  {
        try {
            const token = await FacebookApi.loginAsync();

            await this.props.authStore.login(token, 'FACEBOOK')
        } catch (error) {
            console.log('error', error);            
        }
    }

    render() {
        const { opacity } = this.state;
        const translateX = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
        })
        console.log(`props`, this.props);
        
        return (
            <Box f={1} center bg='white'>

                <BoxAnimated
                    f={4/5}
                    style={{
                        transform: [ {translateX} ]
                    }} 
                >
                    <Box center style={{marginTop: (screen.height / 5.3 ) }} >
                        <OnBoadingLogo/>
                    </Box>
                </BoxAnimated>
                
                <BoxAnimated f={1/5} w='100%' style={{ opacity }}>
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