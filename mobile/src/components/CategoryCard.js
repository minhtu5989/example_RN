import React, { PureComponent } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { Image, } from 'react-native';

import { NavigationService } from "../api/NavigationService";
import { MyButton } from "../commons/MyButton";
import { theme } from '../constants/theme';

class CategoryCard extends PureComponent {
    constructor(props) {
        super(props);
        this._handlePress = this._handlePress.bind(this);
    } 

    _handlePress(){
        NavigationService.navigate('Category', { name: this.props.item.title})
    }

    render() {
        const { item } = this.props;
        return  <Box w='100%' h='100%'  >
                    <MyButton
                        // type='primary'
                        onPress={this._handlePress} 
                        style={{backgroundColor: theme.color.white}}
                    > 
                            { 
                                item.image && 
                                <Image source={item.image} 
                                    style= {{ resizeMode: 'cover', width: '100%', height: '100%', 
                                        position: 'relative', borderRadius: 8,
                                    }} 
                                />
                            }
                                {/* <Text 
                                    size='xs' 
                                    center 
                                    capitalizeEach 
                                    bold
                                    color='blue'
                                    style={{position:'absolute', 
                                        bottom: 5, left: 5
                                    }}
                                >
                                    {item.title}
                                </Text> */}
                    </MyButton>
                </Box>
                
        
    }
}


export default CategoryCard;


