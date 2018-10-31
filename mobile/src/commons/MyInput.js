import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi, Sae } from 'react-native-textinput-effects';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window')


const saeInput = 

    <Box center shadow={1}>
        <Sae
            label={'Email Address'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
        />
    </Box>



const FumiInput = 

    <Box center shadow={1}>
        <Fumi
            label={'Course Name'}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardType='visible-password'
            value={this.state.txtPassword} 
            onChangeText={ txtPassword => this.setState({ txtPassword }) }
            maxLength = {30}
            multiline
            ref='secondInput'
            // onSubmitEditing={this.onLogIn}
            blurOnSubmit={false}
            clearTextOnFocus={true}
            labelStyle={{ color: 'black', fontSize: 13 }}
            inputStyle={{ color: '#1565c0', marginTop: 5, }}
            iconClass={FontAwesomeIcon}
            iconName={'university'}
            iconColor={'red'}
            iconSize={20}
            style={{
                width: width-50,
                height: 65,
                backgroundColor: 'white',
                borderRadius: 10,
            }}
        />
    </Box>