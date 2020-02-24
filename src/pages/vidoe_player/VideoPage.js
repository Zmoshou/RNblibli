import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Orientation from 'react-native-orientation';

import { getVideoDetilUrl, numFormat, getVideoPlayerUrl } from '../../utils/utils';
import VideoPlayer from './VideoPlayer';
import ViderDetilInfo from './ViderDetilInfo';
import VideoComment from './VideoComment';

class VideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreenFlag: true, //当全屏时 控制下方的内容显示和隐藏
            videoPlayerUrl: '',//视频播放链接
            VideoDetilData: {},//根据破解后的视频详情的url发送请求后获取的数据
            reply: "",
            tabChangeFlag: 0,
            status: 0, //数据是否返回状态  ???
            showDetil: false
        }
    }
    _hidefullScreenFlag = () => {
        this.setState({
            fullScreenFlag: !this.state.fullScreenFlag
        })
    }

    componentDidMount() {
        this._getVideoDetilData();
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        if (this.state.fullScreenFlag) {
            return false
        }
        this._setfullScreen();
        return true;
    }

    //设置全屏
    _setfullScreen = () => {
        if (!this.state.fullScreenFlag) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
        this.setState({
            fullScreenFlag: !this.state.fullScreenFlag
        })
    }
    handleBackBtn = () => {

        if (!this.state.fullScreenFlag) {
            this._setfullScreen();
            return
        }

        Actions.pop()
    }

    //获取视频详情
    _getVideoDetilData = () => {
        //getVideoDetilUrl(this.props.aid),获取破解后的视频详情的url
        let url = getVideoDetilUrl(this.props.aid);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    this.setState({
                        VideoDetilData: data.data,
                        reply: data.data.stat.reply,
                        status: 1,
                        showDetil: true
                    })
                    this._getVideoPlayerData(data.data.cid)
                }
            })
    }

    //获取视频播放连接
    _getVideoPlayerData = (cid) => {
        let videoUrl = getVideoPlayerUrl(cid)
        fetch(videoUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    videoPlayerUrl: data.durl[0].url,
                })
            })
    }

    //渲染播放器
    _renderVideoPlatyer = () => {
        return (
            <View style={{ flex: 1, backgroundColor: "#c4c4c4" }}>
                <VideoPlayer
                    back={this.handleBackBtn}
                    setfullScreen={this._setfullScreen}
                    url={this.state.videoPlayerUrl}></VideoPlayer>
            </View>
        )
    }

    //渲染视频详情信息
    _renderVideoDetil = () => {
        return (
            this.state.fullScreenFlag ?
                <View style={{ flex: 2.35 }}>
                    {this.state.showDetil && <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar
                            style={{ height: 38, borderWidth: 0.5 }}
                            tabStyle={{ height: 38, paddingLeft: 5, paddingRight: 5 }}
                        />}
                        tabBarUnderlineStyle={{ backgroundColor: '#fb7b9e', height: 2, borderRadius: 4 }}
                        tabBarTextStyle={{ fontSize: 14 }}
                        tabBarActiveTextColor='#fb7b9e'
                        tabBarInactiveTextColor='#888'
                    >
                        <ViderDetilInfo getVideoPlayerData={this._getVideoPlayerData} VideoDetilData={this.state.VideoDetilData} tabLabel="简介"></ViderDetilInfo>
                        <VideoComment aid={this.props.aid} tabLabel={'评论' + numFormat(this.state.reply)}></VideoComment>
                    </ScrollableTabView>}
                </View>
                : null
        )
    }

    // 主要渲染
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#000'
                    hidden={!this.state.fullScreenFlag}
                // animated={true}
                />
                {this._renderVideoPlatyer()}
                {this._renderVideoDetil()}
            </View >);
    }
}

const styles = StyleSheet.create({
    //infoBox简介部分样式
    topBox: {
        padding: 8,
        borderBottomWidth: 0.2,
        borderColor: '#ccc',
    },
    upInfo: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upInfoLeft: {
        flexDirection: 'row',
    },
    upCover: {
        marginRight: 15,
        width: 38,
        height: 38
    },
    upImg: {
        height: '100%',
        width: '100%',
        borderRadius: 50
    },
    upTitle: {
        justifyContent: 'space-between'
    },
    upname: {
        color: '#fb7b9e',
        fontWeight: 'bold',
        fontSize: 12.5
    },
    fans: {
        fontSize: 12,
        color: '#888'
    },
    upFocus: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#fff',
        backgroundColor: '#fb7b9e',
        textAlign: "center",
        borderRadius: 2
    },
    videoInfo: {
        marginTop: 12,
    },
    videoInfoTopBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    videoTitle: {
        width: '90%',
        fontSize: 15,
    },
    arrorDown: {
        fontFamily: 'iconfont',
        color: '#888',
        textAlign: 'center',
        width: 25,
        height: 15,
    },
    AVnumBox: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    AVnumBoxItem: {
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    AVnumBoxItemText: {
        marginLeft: 2,
        fontSize: 12,
        color: '#888'
    },
    ItemDescText: {
        fontSize: 12,
        color: '#888',
        lineHeight: 18
    },
    statBox: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statItem: {
        width: '20%',
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    },
    iconStyle: {
        fontFamily: 'iconfont',
        color: '#888',
        fontSize: 20,
        textAlign: 'center'
    },
    statItemText: {
        textAlign: 'center',
        marginTop: 2,
        fontSize: 12,
        color: '#888'
    }
})

export default VideoPage;

