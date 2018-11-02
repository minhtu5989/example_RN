import React, { PureComponent } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { Image, } from 'react-native';

import { NavigationService } from "../api/NavigationService";
import { MyButton } from "../commons/MyButton";

class CategoryCard extends PureComponent {
    constructor(props) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    } 

    _handlePress(){
        NavigationService.navigate('Category', { name: this.props.title})
    }

    render() {
        const { item } = this.props;
        return  <Box w='100%' h='100%' center >
                    <MyButton
                        type='primary'
                        onPress={this._handlePress} 
                        style={{backgroundColor: '#6aa3da'}}
                    > 
                            { 
                                item.image && 
                                    <Image source={item.image}/>
                            }
                                <Text 
                                    size='sm' 
                                    center 
                                    capitalizeEach 
                                    color='greyDarker'
                                >
                                    {item.title}
                                </Text>
                    </MyButton>
                </Box>
                
        
    }
}


export default CategoryCard;


