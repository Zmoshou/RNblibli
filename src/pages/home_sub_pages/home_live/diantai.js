import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Video from 'react-native-video'
import { numFormat } from '../../../utils/utils';
import { WebView } from "react-native-webview";


class Diantai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playUrl: '',
            loading: false,//loading显示,
            resizeMode: 'contain', //cover ,stretch,contain
            playInfo: {},
            show: false,
            ws: {}
        }
    }
    componentDidMount() {
        this.getLivePlayUrl();
        this.getLiveRoomid();
    }

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
    //RN向H5页面发送数据
    postMessageToH5 = (data) => {
        this.refs.webView.injectJavaScript(`
            (function(){
               window.postMessage(${JSON.stringify(data)},'*');
            })();
            true;`)
    }



    //获取播放数据
    getLivePlayUrl = () => {
        fetch(`https://api.live.bilibili.com/room/v1/Room/playUrl?build=5470400&device=android&cid=${this.props.roomId}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    this.setState({
                        playUrl: data.data.durl[0].url,
                    })
                }
            })
    }

    videoError = () => {
        // console.warn('播放失败');
    }

    //视频加载成功后调用
    _onLoad = (data) => {
        this.setState({
            loading: false,
        })
    }
    //视频开始加载时
    _onLoadStart = (data) => {
        this.setState({
            loading: true
        })
    }

    //主要渲染
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* 播放器 */}
                <View style={{ width: '100%', height: 200, position: 'relative' }}>
                    <Video
                        style={{
                            position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: '#000'
                        }}
                        source={{ uri: this.state.playUrl ? this.state.playUrl : null }}
                        ref={(ref) => {
                            this.video = ref
                        }}
                        resizeMode={this.state.resizeMode}
                        autoplay={true}
                        onError={this.videoError}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                    />
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={{ position: 'absolute', right: 0, left: 0, top: 0, bottom: 0 }}
                        size="large"
                        color="#fb7b9e"
                    />
                </View>
                {/* tab切换页 */}
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar
                        style={{ height: 38, borderWidth: 0.5 }}
                        tabStyle={{ height: 38, paddingLeft: 5, paddingRight: 5 }}
                    />}
                    tabBarUnderlineStyle={{ backgroundColor: '#fb7b9e', height: 2, borderRadius: 4 }}
                    tabBarTextStyle={{ fontSize: 14 }}
                    tabBarActiveTextColor='#fb7b9e'
                    tabBarInactiveTextColor='#888'
                >
                    <View style={{ flex: 1 }} tabLabel="互动">
                        {this._renderAnchorInfo()}
                    </View>
                    <View style={{ flex: 1 }} tabLabel="主播">
                        <Text>Interact</Text>
                    </View>
                </ScrollableTabView>
            </View >
        )
    }

    _renderAnchorInfo = () => {
        return !this.state.show ? this._renderLonding() : this._renderMain()
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
                <View style={{ flex: 1 }}>
                    <WebView
                        javaScriptEnabled={true}
                        startInLoadingState={true}
                        ref='webView'
                        // onLoadEnd={() => { this.refs.webView.postMessage('RN向H5发送的消息'); }}
                        onLoadEnd={() => this.postMessageToH5(this.props.roomId)}
                        source={{ uri: "file:///android_asset/liveMessage.html" }} />
                </View>
                <Text style={styles.inputComment}>未登录,无法评论</Text>
            </View>
        );
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
    level: {
        borderColor: '#fb7b9e',
        borderWidth: 0.5,
        color: '#fb7b9e',
        fontSize: 12,
        marginLeft: 5,
        borderRadius: 4,
        paddingHorizontal: 5
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




export default Diantai;