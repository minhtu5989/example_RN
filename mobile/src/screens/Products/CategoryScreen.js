import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';

import ProductCart from '../../components/ProductCart';
import { theme } from '../../constants/theme';
import { MyButton } from '../../commons/MyButton';

@inject('productsStore')
class CategoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name'),
    });

    render() {
        const { productsStore } = this.props
        return (
            <Box f={1}>   
                <Box >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            productsStore.data.map(product => (
                                <Box key={product.id} 
                                    style={{borderColor: theme.color.greyLighter, borderWidth: 2}}
                                >
                                    <ProductCart product={product} key={product.id}  />
                                </Box>
                            ))
                        }
                    </ScrollView>
                </Box> 
                <Box f={1}>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <Text m='xs' >
                            - Address (địa chỉ cho user) : kết nối dữ liệu thực, fetch data, add new, update, delete đến server NodeJs
                        </Text>
                        <Text m='xs' >
                            - Category & Product & Slider & Messenges: data tĩnh, chưa hoàn thiện add, update, delete
                        </Text>
                        <Text m='xs' >
                            - chọn địa chỉ thực : sử dụng React-native-google-places-autocomplete 
                        </Text>
                        <Text m='xs' >
                            - Sử dụng Mobx-state-tree (tương tự Redux) để truyền dữ liệu các component với nhau.
                        </Text>
                        <Text m='xs' >
                            - Sử dụng NavigationAction để quản lý các navigate (quản lý các màn hình chặt chẽ hơn )
                        </Text>
                        <Text m='xs' >
                            - Chat Room : sử dụng socket.io và có push notification khi có tin nhắn mới (chưa hoàn thành private chat)
                        </Text>
                        <Text m='xs' >
                            - LogIn với tài khoảng Fb, Google có check auth bằng json web token
                        </Text>
                        <Text m='xs' >
                            - Sử dụng tốt Animation
                        </Text>
                        <Text m='xs' >
                            - Đã host lên heroku và data của mlab 
                        </Text>
                        <Text m='xs' >
                            - Sử dụng tốt design pattern
                        </Text>
                        <Text m='xs' >
                            - Bố trí file và thư mục gọn gàng, logic
                        </Text>
                        <Text>
                            ==> App chưa hoàn thành vì tôi chỉ muốn show off những kỹ năng về React Native của tôi. Mong bạn thông cảm ! Cảm ơn vì đã theo dõi.
                        </Text>
                    </ScrollView>
                </Box>
            </Box>
        );
    }
}

export default CategoryScreen;