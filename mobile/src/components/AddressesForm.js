 import React, { Component } from 'react'
import { StatusBar, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import get from 'lodash.get';

import { Sae } from 'react-native-textinput-effects';

import { observer, inject } from 'mobx-react/native';
import { observable, action, computed } from 'mobx';

import { theme } from '../constants/theme';
import { MyButton } from "../commons/MyButton";

@inject('authStore')
@observer

class AddressesForm extends Component {

    @observable 
    country='Việt Nam'

    @observable 
    address= get(this.props, 'address', null)

    @observable 
    isSaving= false

    @computed 
    get street(){
        return get(this.address, 'street', '')
    }

    @computed 
    get town(){
        return get(this.address, 'town', '')
    }

    @computed 
    get city(){
        return get(this.address, 'city', '')
    }

    @computed 
    get province(){
        return get(this.address, 'province', '')
    }

    // @action.bound
    deleteAddress = () => {
        try {
            Alert.alert(
                'Are you sure?',
                '',
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                        await this.props.authStore.info.removeAddress(this.address._id);
                        this.props.navigation.dismiss();
                        },
                    },
                    
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },

                ],
                { cancelable: true },
            );
        } catch (error) {
          console.log('error', error);
        }
    }

    // @action.bound
    saveAddress = async() => {
        try {
            const { editMode, authStore, navigation } = this.props

            this.isSaving = true

            if(editMode){
                navigation.dismiss()
                return await authStore.info.editAddress(this.address)
            }
            
            navigation.dismiss()
            return await authStore.info.createAddress(this.address)   

        } catch (error) {
            console.log('error', error);
        }
    }

    render() {
        const { editMode } = this.props
        if(this.isSaving)
        {
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.myAppColor} size='large'/>
                </Box>
            )
        }
        return (
            <Box f={1} bg='white' p='sm'>
                <StatusBar barStyle='dark-content'/>
                <ScrollView>
                    <Box mb='sm'>
                        <Sae
                            value={this.street}
                            onChangeText={ street => this.address.street = street }

                            label='Street Number:'
                            iconClass={FontAwesomeIcon}
                            iconName={'road'}
                            iconColor={theme.color.blue}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='done'
                            keyboardType='visible-password'
                            maxLength = {100}
                            multiline
                            blurOnSubmit={false}
                            clearTextOnFocus={true}
                            style={styles._style}
                            labelStyle={styles._labelStyle}
                            inputStyle={styles._inputStyle}
                        />

                        <Box dir='row'>
                            <Box f={1} >
                                <Sae
                                    value={this.town}
                                    onChangeText={ town => this.address.town = town }

                                    label='Town:'
                                    iconClass={Entypo}
                                    iconName={'location'}
                                    iconColor={theme.color.blue}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='done'
                                    keyboardType='visible-password'
                                    maxLength = {30}
                                    multiline
                                    blurOnSubmit={false}
                                    clearTextOnFocus={true}
                                    style={styles._style}
                                    labelStyle={styles._labelStyle}
                                    inputStyle={styles._inputStyle}
                                />
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                                <Sae
                                    value={this.city}

                                    editable={false}
                                    label='City:'
                                    iconClass={MaterialCommunityIcons}
                                    iconName={'city-variant'}
                                    iconColor={theme.color.blue}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='done'
                                    keyboardType='visible-password'
                                    maxLength = {30}
                                    multiline
                                    blurOnSubmit={false}
                                    clearTextOnFocus={true}
                                    style={styles._style}
                                    labelStyle={styles._labelStyle}
                                    inputStyle={styles._inputStyle}
                                />
                            </Box>
                        </Box>

                        <Box dir='row'>
                            <Box f={1}>
                                <Sae
                                    value={this.province}

                                    editable={false}
                                    label='Province:'
                                    iconClass={MaterialCommunityIcons}
                                    iconName={'city'}
                                    iconColor={theme.color.blue}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='done'
                                    keyboardType='visible-password'
                                    maxLength = {30}
                                    multiline
                                    blurOnSubmit={false}
                                    clearTextOnFocus={true}
                                    style={styles._style}
                                    labelStyle={styles._labelStyle}
                                    inputStyle={styles._inputStyle}
                                />
                            </Box>
                            <Box w={theme.space.xs}/>
                            <Box f={1}>
                                <Sae
                                    value={this.country}

                                    editable={false}
                                    label='Country:'
                                    iconClass={MaterialCommunityIcons}
                                    iconName={'city'}
                                    iconColor={theme.color.blue}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='done'
                                    keyboardType='visible-password'
                                    // maxLength = {30}
                                    multiline
                                    blurOnSubmit={false}
                                    clearTextOnFocus={true}
                                    style={styles._style}
                                    labelStyle={styles._labelStyle}
                                    inputStyle={styles._inputStyle}
                                />
                            </Box>
                        </Box>
                            <Sae
                                label='Notice for delivery :'
                                iconClass={MaterialCommunityIcons}
                                iconName={'truck-delivery'}
                                iconColor={theme.color.blue}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                returnKeyType='done'
                                keyboardType='visible-password'
                                // maxLength = {30}
                                multiline
                                blurOnSubmit={false}
                                clearTextOnFocus={true}
                                style={styles._style}
                                labelStyle={styles._labelStyle}
                                inputStyle={styles._inputStyle}
                            />                     
                    </Box>
                </ScrollView>
                <Box  mb='sm' justify='end'>
                    <MyButton 
                        disabled={!this.address.street}
                        type='success'
                        style={{height: 50,}}
                        onPress={this.saveAddress}
                    >
                        <Text bold color="white">
                            {editMode ? 'Edit' : 'Save'}
                        </Text>
                    </MyButton>
                    {editMode && (
                        <MyButton
                            disabled={!this.address.street}
                            type='danger'
                            onPress={this.deleteAddress}
                            style={{marginTop: 20, height: 50}}
                            >
                            <Text bold color="white">
                                Delete
                            </Text>
                        </MyButton>
                    )}
                </Box>

            </Box>
        );
    }
}

const styles = StyleSheet.create({
    _labelStyle:{
        color: theme.color.myAppColor,
        padding: 5,

    },
    _style:{
        backgroundColor: theme.color.greyLightest,
        borderRadius: 5,
        marginTop: 8,
    },
    _inputStyle:{
        paddingHorizontal: 10,
        fontSize: 14,
        color: 'black',
    }
})

export default AddressesForm;

 