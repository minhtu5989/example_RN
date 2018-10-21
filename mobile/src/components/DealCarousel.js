import React, { PureComponent } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Box, Text } from "react-native-design-utility";
import { Dimensions, Image, TouchableOpacity } from 'react-native';

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
    _renderItem ({item, index}) {
        return (
            <Box key={index} center position='relative' w={256}>
                {/* <TouchableOpacity
                    onPress={() => console.log('222')}
                >
                    <Image source = {item.image} shadow={1} f={1} style={{ resizeMode:'contain' ,borderRadius: 10,  }}/>
                </TouchableOpacity>
                <Text mt={5} color='white' center>{ item.title }</Text> */}

                <TouchableOpacity
                    onPress={() => console.log('222')}
                >
                    <Image source = {item.image} shadow={1} style={{ resizeMode: 'contain', borderRadius: 10, width: 256, height: '100%' }}/>
                </TouchableOpacity>
            </Box>
        );
    }

    render () {
        return (
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={SLIDER}
                    firstItem={0}
                    onSnapToItem={() => console.log(111)}
                    layout={'default'}
                    renderItem={this._renderItem}
                    sliderWidth={360}
                    itemWidth={256}
                />
        );
    }
}

export default DealCarousel;
