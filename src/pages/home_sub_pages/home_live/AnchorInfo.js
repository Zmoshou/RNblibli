import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View, Text, ActivityIndicator } from 'react-native'

import { numFormat } from '../../../utils/utils';

class AnchorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playInfo: {},
            show: false
        }
    }

    componentDidMount() {
        this.getLiveRoomid();
    }
    //获取直播信息
    getLiveRoomid = () => {
        fetch(`https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=${this.props.roomId}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    this.setState({
                        playInfo: data.data,
                        show: true
                    })
                }
            })
    }

    _renderLonding = () => {
        return (
            <View style={{ flex: 1, backgroundColor: '#f4f4f4', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator
                    animating={!this.state.show}
                    size="large"
                    color="#fb7b9e" />
                <Text style={{ fontSize: 12, marginTop: 5, color: "#fb7b9e" }}>加载中...</Text>
            </View>
        )
    }

    _renderMain = () => {
        const face = this.state.playInfo.anchor_info && this.state.playInfo.anchor_info.base_info.face;
        const uname = this.state.playInfo.anchor_info && this.state.playInfo.anchor_info.base_info.uname;
        const online = this.state.playInfo.room_info && this.state.playInfo.room_info.online;
        const attention = this.state.playInfo.anchor_info && this.state.playInfo.anchor_info.relation_info.attention
        const level = this.state.playInfo.anchor_info && this.state.playInfo.anchor_info.live_info.level;

        return (
            <View style={{ flex: 1, position: 'relative', backgroundColor: '#f4f4f4' }}>
                <View style={styles.topInfoBox}>
                    <View style={styles.leftBox}>
                        <Image source={{ uri: face }} style={styles.cover} />
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.uname}>{uname}</Text>
                                <Text style={styles.level}>UP{level}</Text>
                            </View>
                            <Text style={styles.fanNum}>
                                <Text>人气:{numFormat(online)}</Text>
                                <Text>粉丝：{numFormat(attention)}</Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.focus}>+关注</Text>
                </View>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexDirection: 'column-reverse' }}
                >
                    <Text style={{ height: 50, backgroundColor: 'blue' }}>123123</Text>
                    <Text style={{ height: 50 }}>123123</Text>
                </ScrollView>
                <Text style={styles.inputComment}>未登录,无法评论</Text>
            </View>
        );
    }

    render() {
        return !this.state.show ? this._renderLonding() : this._renderMain()
    }
}

const styles = StyleSheet.create({
    topInfoBox: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftBox: {
        flexDirection: 'row',
    },
    cover: {
        height: 40,
        width: 40,
        marginRight: 8,
        borderRadius: 50
    },
    level:{
        borderColor:'#fb7b9e',
        borderWidth:0.5,
        color:'#fb7b9e',
        fontSize:12,
        marginLeft:5,
        borderRadius:4,
        paddingHorizontal:5
    },
    uname: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    fanNum: {
        flexDirection: 'row',
        fontSize: 12,
        marginTop: 5,
        color: '#888'
    },
    focus: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#fb7b9e'
    },
    inputComment: {
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fb7b9e',
        textAlign: 'center',
        marginHorizontal: 2,
        color: '#fb7b9e'
    }

})


export default AnchorInfo;