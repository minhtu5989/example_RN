import React, { PureComponent } from 'react';
import Swiper from 'react-native-swiper';
import { Box, Text } from "react-native-design-utility";
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { ViewPagerAndroid } from 'react-native-gesture-handler';
import { theme } from '../constants/theme';

const {width, height} = Dimensions.get('screen');

const SLIDER = [
        {
            title: 'image 1',
            image: require('../../assets/img/slider1.jpg')
        },
        {
            title: 'image 2',
            image: require('../../assets/img/slider2.jpg')
        },
        {
            title: 'image 3', 
            image: require('../../assets/img/slider3.jpg')
        },
        {
            title: 'image 4',
            image: require('../../assets/img/slider4.jpg')
        },
]
        //   f={1} position='relative'

class DealCarousel extends PureComponent {
    render () {
        return (
            <Swiper center autoplay={true} autoplayTimeout={3} activeDotColor={theme.color.myAppColor} dotColor='white' >
                { SLIDER.map((slider) => {
                    return(
                    <TouchableOpacity
                        f={1}
                        center
                        onPress={() => console.log('222')}
                        key = {slider.title}
                        w={width}
                        h={200}
                    >
                        <Box center style={{paddingTop:10}}>
                            <Image 
                                source = { slider.image } 
                                shadow={1} 
                                center
                                style={{ resizeMode: 'cover', borderRadius: 10, width: width-20, height: 180 }}
                            />
                        </Box>
                    </TouchableOpacity>
                    )
                }) }
            </Swiper>
        );
    }
}

export default DealCarousel;
