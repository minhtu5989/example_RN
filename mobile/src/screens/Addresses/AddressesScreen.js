import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { 
    StatusBar, 
    Dimensions, 
    Alert, 
    FlatList,
    ActivityIndicator, 
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import Swipeable from 'react-native-swipeable';
import { EvilIcons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action, when } from 'mobx'
import { NavigationService } from '../../api/NavigationService';

import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';
import { AddressListItem } from "../../components/AddressListItem";

const {width} = Dimensions.get('window')


@inject('authStore')
@observer


class AddressesScreen extends Component {

    @observable isLoading = false
    @observable data = this.props.authStore.info.addresses

    static navigationOptions = ({navigation}) => {
        const headerRight = navigation.getParam('showAddBtn') 
        ?
        <Box mr='xs'>
            <MyButton onPress={navigation.getParam('handleAddressesPress')} >
                <MaterialIcons color={theme.color.myAppColor} name="add-circle-outline" size={28} />
            </MyButton>
        </Box>
        : 
        null
        return {
            title: 'Address',
            headerRight 
        }
        
    }

    constructor(props){
        super(props);
        this.state ={ 
            currentlyOpenSwipeable: null,
            toggle: false,
            leftActionActivated: false,
        }
        when(
            () => !this.props.authStore.info.addressesIsEmpty,
            () => {
                setTimeout(() => {
                    this.setAddBtn()
                }, 1500); 
            }
        )
    }

    @action.bound
    deleteRow(rowId) {
        try {
            const {info} = this.props.authStore
            Alert.alert(
                'Are you sure?',
                '',
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            await info.removeAddress(rowId);
                            const newData = [...this.data];
                            const prevIndex = this.data.findIndex(item => item._id === rowId);
                            newData.splice(prevIndex, 1);
                            this.data = newData
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

    @action.bound
    editRow(item) {
        NavigationService.navigate('EditAddress', { address : item })
    }

    handleScroll = () => {
        const {currentlyOpenSwipeable} = this.state;

        if (currentlyOpenSwipeable) {
            currentlyOpenSwipeable.recenter();
        }
    };


    componentDidMount = () => {
        this.fetchAddresses();
    }

    @action.bound
    async fetchAddresses()  {
        try {
            this.isLoading = true
            const res = await this.props.authStore.info.getAddresses()
            this.isLoading = false
        } catch (error) {
            throw error
        }
    }

    setAddBtn = () => {
        this.props.navigation.setParams({
            showAddBtn: true,
            handleAddressesPress: this.handleAddressesPress
        })
    }

    handleAddressesPress = () => {
        this.props.navigation.navigate('AutoCompleteAddress')
    }

    renderIfEmpty = () => (
        <Box f={1} center bg='white'>
            <StatusBar barStyle='dark-content'/>
            <Box  center px='md'>
                <Box center mb='md'>
                    <EvilIcons name='location' color={theme.color.black} size={200}/>
                </Box>         
                <Box center mb='md'>
                    <Text bold size='lg'>
                        Add address
                    </Text>
                    <Text bold size='sm' color={theme.color.grey}>
                        You haven't added an address yet !
                    </Text>                
                </Box>
                <Box w={width - 48} h={40} style={{justifyContent:'flex-end', marginBottom: 15}}>
                    <MyButton type='success' onPress={this.handleAddressesPress}>
                        <Text>Add address</Text>
                    </MyButton>
                </Box> 
            </Box>
        </Box>
    )

    onOpen = (event, gestureState, swipeable) => {
        const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
            currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
    }

    onClose = () => this.setState({currentlyOpenSwipeable: null})

    renderItem = ({item}) => {
        const { leftActionActivated, toggle } = this.state
        const widthButton = 70
        return ( 
            <Swipeable  
                rightButtons={[
                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: theme.color.greenLight }]}
                        onPress={ () => this.editRow(item) }
                    >
                        <Box  w={widthButton} center
                        >
                            <FontAwesome name="edit" size={24} color={theme.color.white} />
                        </Box>
                    </TouchableOpacity>,

                    <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor:theme.color.redLight }]}
                        onPress={() => this.deleteRow(item._id)}
                    >
                        <Box alignItems='flex-start' w={widthButton}  center
                        >
                            <AntDesign name="delete" size={24} color={theme.color.white} />
                        </Box>
                    </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease={this.onOpen}
                onRightButtonsCloseRelease={this.onClose}
                rightButtonWidth={widthButton}

                leftActionActivationDistance={200}
                leftContent={(
                <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? 'lightgoldenrodyellow' : 'steelblue'}]}>
                    {leftActionActivated ?
                    <Text>release!</Text> :
                    <Text>keep pulling!</Text>}
                </View>
                )}
                onLeftActionActivate={() => this.setState({leftActionActivated: true})}
                onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
                onLeftActionComplete={() => this.setState({toggle: !toggle})}
            >
                <AddressListItem address={item} />
            </Swipeable>
        )
    }

    render() {  
        const {info} = this.props.authStore

        if(this.isLoading && info.totalAddresses === 0)
        {
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.myAppColor} size='large' />
                </Box>
            )
        }

        if( info.totalAddresses === 0 ){
            return this.renderIfEmpty();
        }

        return (
            <Box f={1} bg='white'>
                <StatusBar barStyle="dark-content" />
}
                <FlatList 
                    onScroll={this.handleScroll}
                    data={this.data} 
                    renderItem={this.renderItem} 
                    keyExtractor={ (item) => String(item._id) } 
                />

            </Box>
        )
    }
}

const styles = StyleSheet.create({

    leftSwipeItem: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: 20
    },
    rightSwipeItem: {
      flex: 1,
      justifyContent: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth, 
      borderBottomColor: theme.color.grey,
      borderLeftWidth: StyleSheet.hairlineWidth, 
      borderLeftColor: theme.color.grey,
    },
  
  });

export default AddressesScreen;