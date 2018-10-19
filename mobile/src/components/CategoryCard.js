import React, { PureComponent } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { Image } from 'react-native';

class CategoryCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  };
    } 
    render() {
        const {title, image} = this.props
        return (
            <Box center>  
                { 
                    image && 
                    (<Box center mb='sm '>
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
        );
    }
}

export default CategoryCard;


