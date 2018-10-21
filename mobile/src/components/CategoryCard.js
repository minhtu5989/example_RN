import React, { PureComponent } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { Image, TouchableOpacity } from 'react-native';

import { NavigationService } from "../api/NavigationService";
import { MyButton } from "../commons/MyButton";
class CategoryCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
        this._handlePress = this._handlePress.bind(this);
    } 

    _handlePress(){
        NavigationService.navigate('Category', { name: this.props.title})
    }

    render() {
        const {title, image} = this.props
        return (
            <MyButton
                type='primary's 
                onPress={this._handlePress}
            >
                <Box center f={1}>  
                    { 
                        image && 
                        (<Box center mb='sm'>
                            <Image source={image}/>
                        </Box>)
                    }
                    
                    <Box center>
                        <Text 
                            size='sm' 
                            center 
                            capitalizeEach 
                            color='greyDarker'
                        >
                            {title}
                        </Text>
                    </Box>
                </Box>
            </MyButton>
        );
    }
}

export default CategoryCard;


