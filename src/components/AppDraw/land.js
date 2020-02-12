import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Item } from 'native-base';

class Land extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: '主页',
                },
                {
                    name: '历史记录',
                },
                {
                    name: '离线缓存',
                },
                {
                    name: '我的收藏',
                },
                {
                    name: '稍后再看',
                }
            ]
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#fb7b9e', width: '100%', height: '28.6%', }}>
                    <Image source={require('../../assets/images/me_tv_sign_out.png')} style={{ width: '83%', height: '100%', marginLeft: '17%' }}></Image>
                    <Image source={require('../../assets/images/bili_default_avatar.png')} style={{ width: '20.8%', height: '32%', marginTop: '-46%', marginLeft: '4%' }}></Image>
                    <Text style={{ fontSize: 12, marginLeft: '4%', marginTop: '5%', color: 'white', marginBottom: '2%' }}>未登录</Text>
                    <Text style={{ fontSize: 10, marginLeft: '4%', color: 'gray' }}>点击头像登陆</Text>
                    <Text style={{ fontFamily: 'iconfont', color: 'white', marginLeft: '60%', marginTop: '-40%', fontSize: 20 }}>&#xe6d4;</Text>
                    <Text style={{ fontFamily: 'iconfont', color: 'white', marginLeft: '80%', marginTop: '-8%', fontSize: 20 }}>&#xe690;</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '10%' }}>
                    <View style={{ height: '7%', paddingTop: '4%' }}>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe661;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe67b;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe6bb;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe673;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe68b;</Text>
                    </View>
                    <View style={{ height: '7%', paddingTop: '4%', marginLeft: '20%' }}>
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <Text key={index} style={{ marginBottom: '30%' }}>{item.name}</Text>
                                )
                            })}
                    </View>
                </View>
                <View style={{ width: '100%', borderColor: 'gary', borderBottomWidth: 0.3, }}></View>

                <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '10%' }}>
                    <View style={{ height: '7%', paddingTop: '4%' }}>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe6bd;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe6bf;</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 20, marginBottom: '80%' }}>&#xe6b0;</Text>
                    </View>
                    <View style={{ height: '7%', paddingTop: '4%', marginLeft: '20%' }}>
                        <Text style={{ marginBottom: '30%' }}>投稿</Text>
                        <Text style={{ marginBottom: '30%' }}>我的订单</Text>
                        <Text style={{ marginBottom: '30%' }}>直播中心</Text>
                    </View>
                </View>
                <View style={{ width: '100%', borderColor: 'white', borderBottomWidth: 0.5, marginTop: '16%', marginBottom: '6%' }}></View>
                <View style={{ flexDirection: 'row', marginLeft: '10%' }}>
                    <Text style={{ fontFamily: 'iconfont', fontSize: 20 }}>&#xe6c0;</Text>
                    <Text style={{ marginRight: '10%' }}>设置</Text>
                    <Text style={{ fontFamily: 'iconfont', fontSize: 20 }}>&#xe6c3;</Text>
                    <Text style={{ marginRight: '10%' }}>主题</Text>
                    <Text style={{ fontFamily: 'iconfont', fontSize: 20 }}>&#xe6c2;</Text>
                    <Text style={{ marginRight: '10%' }}>夜间</Text>
                </View>



            </View>
        )

    }
}

export default Land;
