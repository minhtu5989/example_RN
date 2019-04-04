import React, { Component } from 'react'
import { Box, Text } from 'react-native-design-utility'
import { 
    FlatList,
    ActivityIndicator, 
} from 'react-native'
// import Swipeable from 'react-native-swipeable';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { inject, observer } from 'mobx-react/native'
import { observable, action, when } from 'mobx'
// import { NavigationService } from '../../api/NavigationService';

import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';
import { AddressListItem } from "../../components/AddressListItem";
import AddModal from '../../components/AddModal';


@inject('authStore')
@observer
class AddressesScreen extends Component {

    @observable isLoading = false

    static navigationOptions = ({navigation}) => {
        const headerRight = navigation.getParam('showAddBtn') 
        ?
        <Box mr='xs'>
            <MyButton onPress={navigation.getParam('handleAddAddress') } >
                <MaterialIcons color={theme.color.white} name="add-circle-outline" size={30} />
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
        this.handleAddAddress = this.handleAddAddress.bind(this);

        when(
            () => this.props.authStore.info.totalAddresses !== 0,
            () => {
                setTimeout(() => {
                    this.setAddBtn()
                }, 1500); 
            }
        )
    }

    componentDidMount = () => {
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
            handleAddAddress: this.handleAddAddress
        })
    }

    handleAddAddress = () => {
        this.props.navigation.navigate('AutoCompleteAddress')
        // this.refs.addModal.showAddModal()
    }

    renderIfEmpty = () => (
        <Box f={1} center bg='white'>
            <Box f={1} center px='md'>
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
            </Box>
            <Box w='90%' h={40} style={{justifyContent:'flex-end', marginBottom: 20}}>
                <MyButton type='success' onPress={this.handleAddAddress}>
                    <Text>Add address</Text>
                </MyButton>
            </Box> 
        </Box>
    )

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

        if( info.totalAddresses === 0 || this.data === [] ){
            return this.renderIfEmpty();
        }

        return (
            <Box f={1} bg='white'>
                {
                    this.data === [] 
                    ?
                    <Box f={1} center bg='white'>
                        <ActivityIndicator color={theme.color.myAppColor} size='large' />
                    </Box>
                    :
                    <FlatList 
                        // onScroll={this.handleScroll}
                        ref={'flatList'}
                        data={info.addressList} 
                        extraData={info}
                        keyExtractor={ (item) => String(item._id) } 
                        renderItem={ ({item, index}) => 
                            <AddressListItem 
                                address={item} 
                                index={index} 
                            /> 
                        } 
                    />
                }
                    <AddModal ref={'addModal'} parentFlatlist={this} >
                    
                    </AddModal>

            </Box>
        )
    }
}

export default AddressesScreen;