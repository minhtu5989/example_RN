import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete'; // 1.2.12
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

import { buildAddress } from "../utils/buildAddress";
import { NavigationService } from '../api/NavigationService';

// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class AutoCompleteAddressScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search Address',
    headerLeft: <EvilIcons style={{marginLeft: 8,}} color={theme.color.myAppColor} size={25} name="close" onPress={() => navigation.goBack(null)} />,
  });

  render() {
    return (
      <Box f={1} bg='white'>
        <GooglePlacesAutocomplete
          keyboardShouldPersistTaps='never'
          placeholder="Search address ..."
          minLength={2} 
          // autoFocus={true}
          returnKeyType={'search'} 
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            let address = buildAddress(details)
            NavigationService.navigate('AddressesForm',{ address: address }) 
            // console.log('data', data);
            // console.log('details',details);
            // console.log('address', address);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAGF8cAOPFPIKCZYqxuibF9xx5XD4JBb84',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
            components: 'country:vn',
          }}
          styles={{
            listView:{
                backgroundColor:'white',
            },
            textInputContainer: {
                backgroundColor: theme.color.greyLightest,
                borderTopWidth: 0,
                borderBottomWidth:0.6
            },
            description: {
              fontWeight: 'bold',
              height: 50,
              // color: theme.color.myAppColor
            },
            predefinedPlacesDescription: {
              color: theme.color.myAppColor,
            },
          }}
          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Tìm vị trí của tôi"
          nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            rankby: 'distance',
            types: '(cities)',
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: '(cities)',
          }}
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //   predefinedPlaces={[homePlace, workPlace, ]}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={()  => <Box ml={8} center> <FontAwesome name='search' size={25} color={theme.color.myAppColor} /> </Box> }
        //   renderRightButton={() => <Text>Custom text after the input</Text>}
        />
      </Box>
    );      
  }
}

export default AutoCompleteAddressScreen;

































// import React, { Component } from 'react'
// import { Box, Text } from 'react-native-design-utility'
// import { GoogleAutoComplete } from 'react-native-google-autocomplete';
// import { TextInput, ScrollView, ActivityIndicator } from 'react-native';
// import { API_KEY } from '../constants/API_KEY';
// import { theme } from '../constants/theme';
// import LocationItem from '../components/LocationItem';

// const AutoCompleteAddressScreen = ({ navigation }) => {
//     return ( 
//         <Box f={1} bg='white'>
//             <GoogleAutoComplete apiKey={API_KEY} components="country:vn">
//                 {
//                     ({ 
//                         handleTextChange, 
//                         inputValue, 
//                         locationResults, 
//                         isSearching,
//                         fetchDetails
//                     }) => (
//                         <React.Fragment>
//                             <Box h={40} mt={10} center w='100%'>
//                                 <Box bg='greyLighter' radius={6} h='90%' w='90%' p={8}>
//                                     <TextInput 
//                                         placeholder='Search Address'
//                                         selectionColor={theme.color.myAppColor}
//                                         autoFocus
//                                         onChangeText={handleTextChange}
//                                         value={inputValue}
//                                     />
//                                 </Box>
//                             </Box>
//                             {
//                                 isSearching && locationResults.length === 0
//                                 ?
//                                 (
//                                     <Box h='100%' w='100%' center>
//                                         <ActivityIndicator color={theme.color.myAppColor} size='large'/>
//                                     </Box>
//                                 )
//                                 :
//                                 (
//                                     <ScrollView bg='red' style={{height: 100}} mt={10}>
//                                         {
//                                             locationResults.map(location => {
//                                                 <LocationItem 
//                                                     key={location.id} 
//                                                     {...location} 
//                                                     fetchDetails={fetchDetails}
//                                                     searchAddress={navigation.getParam('searchAddress')}
//                                                 />
//                                             }) 
//                                         }
//                                     </ScrollView>
//                                 )
//                             }
//                         </React.Fragment>
//                     )
//                 }
//             </GoogleAutoComplete>
//         </Box>
//     )
// }

// export default AutoCompleteAddressScreen;