import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import Swiper from 'react-native-swiper'


class BmSwiper extends Component {

    render() {
        return (// 轮播图片 
            <View style={{
                borderRadius: 4,
                overflow: "hidden",
                marginLeft: 12,
                marginRight: 12,
                marginTop: 12
            }}>
                <Swiper
                    height={180}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={4}
                    dot={<View style={{ backgroundColor: '#fff', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#fb7b9e', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: 0, left: null, right: 20
                    }}
                >
                    {this.props.imgSource.map((item, index) =>
                        <View key={index}>
                            <Text style={{ position: "absolute", left: 10, bottom: 3, zIndex: 10, color: '#FFF', fontWeight: "bold" }}>{item.title}</Text>
                            <Image resizeMode={'stretch'} style={{ width: '100%', height: 180 }} source={{ uri: item.pic }} />
                        </View>)}
                </Swiper>
            </View>)
    }
}

export default BmSwiper;