import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { API_KEY } from '../constants/API_KEY';
import { theme } from '../constants/theme';
import LocationItem from '../components/LocationItem';

const AutoCompleteAddressScreen = () => {
    return ( 
        <Box f={1} bg='white'>
            <GoogleAutoComplete apiKey={API_KEY}>
                {
                    ({ handleTextChange, inputValue, locationResults, isSearching}) => (
                        <React.Fragment>
                            <Box h={40} mt={10} center w='100%'>
                                <Box bg='greyLighter' radius={6} h='90%' w='90%' p={8}>
                                    <TextInput 
                                        placeholder='Search Address'
                                        selectionColor={theme.color.green}
                                        autoFocus
                                        onChangeText={handleTextChange}
                                        value={inputValue}
                                    />
                                </Box>
                            </Box>
                            {
                                isSearching && locationResults.length === 0
                                ?
                                (
                                    <Box h='100%' w='100%' center>
                                        <ActivityIndicator color={theme.color.green} size='large'/>
                                    </Box>
                                )
                                :
                                (
                                    <ScrollView bg='red' style={{height: 100}}>
                                        {
                                            locationResults.map(location => {
                                                <LocationItem 
                                                    key={location.id} 
                                                    {...location} 
                                                    fetchDetails={fetchDetails}
                                                />
                                            }) 
                                        }
                                    </ScrollView>
                                )
                            }
                        </React.Fragment>
                    )
                }
            </GoogleAutoComplete>
        </Box>
    )
}

export default AutoCompleteAddressScreen;