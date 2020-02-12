import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet } from 'react-native'

class Classify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [], // 频道列表
        }

    }
    render() {
        return (
            <View style={{ flex: 1, overflow: 'hidden' }}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            colors={["#fb7b9e"]}
                        />}
                    data={this.state.channels}
                    keyExtractor={(item, i) => i} // 解决 key 问题
                    renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
                    numColumns={4} // 多列布局（4列）
                //columnWrapperStyle={{}} // 每一行容器的样式
                />
            </View >

        );
    }

    componentWillMount() {
        this.getChannels()
    }

    // 获取频道列表
    getChannels = () => {
        const url = 'https://app.bilibili.com/x/channel/square?appkey=1d8b6e7d45233436&build=5370000&channel=huawei&login_event=1&mobi_app=android&platform=android&ts=1557534415&sign=1f43ef46c4bf2d4d738ab7af0f809b3d'
        //在RN中要发送网络请求，可以直接用fetch()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState((state) => {
                    return {
                        isloading: false,
                        channels: state.channels.concat(data.data.region)
                    }
                })
            })
    }

    // 渲染每一个列表
    renderItem = (item) => {
        return <View style={{ padding: 10, width: "25%", alignItems: 'center' }}>
            <Image source={{ uri: item.logo }} style={{ width: 45, height: 45, }}></Image>
            <View>
                <Text style={styles.channelName}>{item.name}</Text>
            </View>
        </View>

    }
}

const styles = StyleSheet.create({
    channelName: {
        fontSize: 12,
    },
})

export default Classify;