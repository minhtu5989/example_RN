import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { StatusBar, Dimensions, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action, when, reaction } from 'mobx'
import Swipeable from 'react-native-swipeable';

import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';
import AddressListItem from '../../components/AddressListItem';

const {width} = Dimensions.get('window')

@inject('authStore')
@observer

class AddressesScreen extends Component {

    @observable isLoading = false
    
    static navigationOptions = ({navigation}) => {
        const headerRight = navigation.getParam('showAddBtn') 
        ?
        <Box mr='xs'>
            <MyButton onPress={navigation.getParam('handleAddressesPress')} >
                <Text color={theme.color.myAppColor}>Add</Text>
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
        //value 2 sẽ chạy chỉ 1 lần khi value 1 đúng  (when)
        this.state = { 
            isSwiping: true, 
            swipeable: null
        }
        when(
            () => !this.props.authStore.info.addressesIsEmpty,
            () => {
                setTimeout(() => {
                    this.setAddBtn()
                }, 1500); 
            }
        )

        //value 2 sẽ đc chạy mỗi lần value 1 đúng   (reaction)
        // reaction(
        //     () => !this.props.authStore.info.addressesIsEmpty,
        //     () => {
        //         this.setAddBtn()
        //     }
        // )
    }


    componentDidMount() {
        this.fetchAddresses();
    }

    @action.bound
    async fetchAddresses()  {
        try {
            this.isLoading = true
            await this.props.authStore.info.getAddresses()
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

    releaseLeft(){ 
        const leftFlag = 'left True'
        console.log('leftFlag', leftFlag);
    }

    releaseRight() { 
        const rightFlag = 'right True'
        console.log('rightFlag', rightFlag);
    }

    handleUserBeganScrollingParentView = () => {
        this.swipeable.recenter();
    }

    @action.bound
    renderList() {
        const { info } = this.props.authStore
        
        if( this.props.authStore.info.totalAddresses === 0 ){
            return this.renderIfEmpty();
        }

        const leftContent = <Box f={1} bg={theme.color.primary}><Text>Edit</Text></Box>
        const rightContent = <Box f={1} bg={theme.color.danger}><Text>Delete</Text></Box>
        const rightButtons = [
            <Box center f={1} bg='red' w={100}>
                <Text color='black'>Button 1</Text>
            </Box>,
            <Box center f={1} bg='blue' w={100}>
                <Text color='black'>Button 2</Text>
            </Box>
          ];
        
        return(
            <Box f={1} bg='white'>
                <StatusBar barStyle='dark-content'/>
                <Box style={{flex: 1}}>
                    <FlatList 
                        onScroll={this.handleUserBeganScrollingParentView}
                        scrollEnabled={!this.state.isSwiping}
                        data={info.addressList} 
                        renderItem={ ({item}) => 
                            <Swipeable 
                                onRef={ref => this.swipeable = ref}
                                leftContent={leftContent}   
                                leftActionActivationDistance={150}
                                onLeftActionRelease={this.releaseLeft}
                                leftButtonWidth={50}

                                // rightContent={rightContent} 
                                // rightActionActivationDistance={150}
                                // onRightActionRelease={this.releaseRight}
                                rightButtons={rightButtons}
                                rightButtonWidth={100}

                                onSwipeStart={() => this.setState({ isSwiping: true})}
                                onSwipeRelease={() => this.setState({ isSwiping: false})}
                            >
                                <AddressListItem address={item} /> 
                            </Swipeable>
                        } 
                        keyExtractor={item => String(item._id)} 
                    />
                </Box>
            </Box>
        )
    }

    

    render() {
        if(this.isLoading && this.props.authStore.info.totalAddresses === 0)
        {
            return (
                <Box f={1} center bg='white'>
                    <ActivityIndicator color={theme.color.myAppColor} size='large' />
                </Box>
            )
        }
        return this.renderList()
    }
}

export default AddressesScreen;