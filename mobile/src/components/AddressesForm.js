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

    @observable 
    street = get(this.address, 'street', '')

    @observable 
    town = get(this.address, 'town', '')

    @observable 
    city = get(this.address, 'city', '')

    @observable 
    province = get(this.address, 'province', '')

    @observable
    instructions = get(this.address, 'instructions', '')
    
    // @action.bound
    saveAddress = async() => {
        try {
            const { editMode, authStore, navigation } = this.props

            this.isSaving = true
            var newAddress = Object.assign({}, this.address);
            newAddress.street = this.street
            newAddress.town = this.town
            newAddress.city = this.city
            newAddress.province = this.province
            newAddress.instructions = this.instructions

            if(editMode){
                navigation.dismiss()
                return await authStore.info.editAddress(newAddress)
            }
            
            navigation.dismiss()
            return await authStore.info.createAddress(newAddress)   

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
                            onChangeText={ street => this.street = street }

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
                                    onChangeText={ town => this.town = town }

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
                                    onChangeText={ city => this.city = city }

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
                                    onChangeText={ province => this.province = province }

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
                                value={this.instructions}
                                onChangeText={ instructions => this.instructions = instructions }

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
                        disabled={!this.street && !this.town}
                        type='success'
                        style={{height: 50,}}
                        onPress={this.saveAddress}
                    >
                        <Text bold color="white">
                            {editMode ? 'Edit' : 'Save'}
                        </Text>
                    </MyButton>
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

 