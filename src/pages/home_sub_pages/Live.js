import React, { Component } from 'react';
import { StyleSheet, RefreshControl, View, Text, Image, ScrollView, TouchableHighlight, Dimensions, Animated } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'

import { numFormat, strFormat, changeArrIndex } from '../../utils/utils';
import LiveItemUI from '../../components/Live/LiveItemUI';

const BannerWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BannerHeight = 110;

const iconList = [
    {
        id: 1,
        url: "http://i0.hdslb.com/bfs/vc/dcfb14f14ec83e503147a262e7607858b05d7ac0.png",
        title: "英雄联盟"
    },
    {
        id: 2,
        url: "http://i0.hdslb.com/bfs/vc/c666c6dc2d5346e0d3cfda7162914d84d16964dd.png",
        title: "lol云顶之弈"
    },
    {
        id: 3,
        url: "http://i0.hdslb.com/bfs/vc/8f7134aa4942b544c4630be3e042f013cc778ea2.png",
        title: "王者荣耀"
    },
    {
        id: 4,
        url: "http://i0.hdslb.com/bfs/live/827033eb0ac50db3d9f849abe8e39a5d3b1ecd53.png",

        title: "单机"
    },
    {
        id: 5,
        url: "http://i0.hdslb.com/bfs/live/a7adae1f7571a97f51d60f685823acc610d00a7e.png",
        title: "电台"
    },
    {
        id: 6,
        url: "http://i0.hdslb.com/bfs/vc/9bfde767eae7769bcaf9156d3a7c4df86632bd03.png",
        title: "怪物猎人"
    },
    {
        id: 7,
        url: "http://i0.hdslb.com/bfs/vc/973d2fe12c771207d49f6dff1440f73d153aa2b2.png",
        title: "无主之地3"
    },
    {
        id: 8,
        url: "http://i0.hdslb.com/bfs/vc/976be38da68267cab88f92f0ed78e057995798d6.png",
        title: "第五人格"
    },
    {
        id: 9,
        url: "http://i0.hdslb.com/bfs/live/8fd5339dac84ec34e72f707f4c3b665d0aa41905.png",
        title: "娱乐"
    },
    {
        id: 10,
        url: "https://i0.hdslb.com/bfs/vc/ff03528785fc8c91491d79e440398484811d6d87.png",
        title: "全部标签"
    },

]

class Live extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            bannerList: [],
            recommendLiveList: [],
            hourOrderInfo: {},
            audioLiveInfo: {},
            videoLiveInfo: {},
            pvpLiveInfo: {},
            isloading: false,
            changeNum: 0,
            doRotate: new Animated.Value(0)
        }
    }
    componentDidMount() {
        this.setState({
            refreshing: true
        })
        this.getLiveDetail();
    }

    //比免重复渲染
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextState.hourOrderInfo == this.state.hourOrderInfo) {
    //         return false
    //     }
    //     return true
    // }

    getLiveDetail = () => {
        fetch('https://api.live.bilibili.com/room/v2/AppIndex/getAllList?device=phone&platform=ios&scale=3')
            .then((response) => response.json())//取数据
            .then(data => {//处理数据
                //通过setState()方法重新渲染界面\
                if (data.code === 0) {
                    this.setState({
                        refreshing: false,
                        isloading: true,
                        bannerList: data.data.module_list[0].list,
                        //推荐直播
                        recommendLiveInfo: data.data.module_list[7].module_info,
                        recommendLiveList: data.data.module_list[7].list,
                        //小时榜
                        hourOrderInfo: data.data.module_list[12].module_info,
                        hourOrderList: changeArrIndex(data.data.module_list[12].list, 0, 1),
                        //其他直播
                        audioLiveInfo: data.data.module_list[13],
                        videoLiveInfo: data.data.module_list[14],
                        pvpLiveInfo: data.data.module_list[15],
                        netGameLiveInfo: data.data.module_list[16],
                        mobileGameLiveInfo: data.data.module_list[17],
                        localGameLiveInfo: data.data.module_list[18],
                        recreationLiveInfo: data.data.module_list[19],
                        paintingLiveInfo: data.data.module_list[20],
                    })

                }
            })
    }


    _onRefresh = () => {
        this.setState((oldState) => {
            return {
                refreshing: true,
                // hotList: [],
            }
        }, this.getLiveDetail)
    }



    _toMoreDiantai = () => {
        Actions.moreDiantai()
    }

    _toDiantai = (item) => {
        Actions.diantai({ 'roomId': item.roomid })
    }
    toWebView = (url, title) => {
        Actions.webView({ 'webUrl': url, title: title })
    }
    //轮播图部分
    _renderBanner = () => {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5, height: BannerHeight, borderRadius: 6, overflow: 'hidden' }}>
                <Swiper
                    autoplay={true}
                    autoplayTimeout={4}
                    dot={<View style={{ backgroundColor: '#fff', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#fb7b9e', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: 0, left: null, right: 20
                    }}
                >
                    {this.state.bannerList.map((item, index) => {
                        return (
                            <TouchableHighlight
                                onPress={() => this.toWebView(item.link, item.title)}
                                underlayColor="#f3f3f3"
                                key={index}>
                                <Image style={{ width: '100%', height: BannerHeight }} source={{ uri: item.pic }} />
                            </TouchableHighlight>
                        );
                    })}
                </Swiper>
            </View>
        )
    }


    //第二部分，图标
    _renderIconList = () => {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {iconList.map((item, index) => {
                    return (
                        <View style={styles.box} key={index}>
                            <Image source={{ uri: item.url }} style={{ width: 45, height: 45 }}></Image>
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: '#888' }}>{item.title}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }


    //第三部分 每个模块 推荐模块
    _readerRecommendBox = () => {
        return (
            <View style={styles.livebox}>
                <View style={styles.titleBox}>
                    <Text style={styles.leftText}>{this.state.recommendLiveInfo.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text onPress={this._changeRecommentList} style={styles.rightText}>换一换</Text>
                        <Animated.Text style={{
                            fontFamily: 'iconfont',
                            color: '#888',
                            transform: [{
                                rotate: this.state.doRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '-360deg'] //线性插值，0对应0deg  1对应360deg 
                                })
                            }]
                        }}>&#xe67f;</Animated.Text>
                    </View>
                </View>
                <View style={styles.mianBox}>
                    {
                        this.state.recommendLiveList.slice(this.state.changeNum * 6, (this.state.changeNum + 1) * 6).map((item, index) => {
                            return <TouchableHighlight style={styles.itemBox}
                                onPress={() => this._toDiantai(item)}
                                underlayColor="#f3f3f3"
                                key={index}>
                                <LiveItemUI
                                    title={item.title}
                                    type={item.area_v2_name}
                                    cover={item.cover}
                                    pendentPic={item.pendent_ru_pic}
                                    pendentRu={item.pendent_ru}
                                    uname={item.uname}
                                    onlineNum={numFormat(item.online)}
                                ></LiveItemUI>
                            </TouchableHighlight>
                        })
                    }

                </View>
            </View>
        )
    }

    //渲染小时排行榜
    _renderHourOrder = (obj) => {
        return (
            <View style={styles.hourOrderBox}>
                <View style={styles.headBox}>
                    <View style={styles.headBoxLeft} >
                        <Text style={styles.hourTitle}>{this.state.hourOrderInfo.title}</Text>
                        <Text style={styles.subHourTitle}>{this.state.hourOrderInfo.sub_title}</Text>
                    </View>
                    <View style={styles.headBoxRight} >
                        <Text style={styles.rightText}>查看更多</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 12, color: '#888' }}>&#xe693;</Text>
                    </View>
                </View>
                <View style={styles.mainBox}>
                    {
                        this.state.hourOrderList.map((item, index) => {
                            return (
                                <TouchableHighlight
                                    style={styles.mainBoxItem} key={index}
                                    onPress={() => this._toDiantai(item)}
                                    underlayColor="#f3f3f3">
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <View style={styles.topBox}>
                                            <Image style={styles.topImg} source={require('../../assets/images/paihang.png')} />
                                            <Text style={styles.rank}>{item.rank}</Text>
                                            <Image style={styles.mainBoxItemCoverA} source={{ uri: item.face }} />
                                            {item.live_status === 1 ? <Text style={styles.liveStatus}>直播中</Text> : null}
                                        </View>
                                        <Text style={styles.mainBoxItemUname}>{strFormat(item.uname, 5)}</Text>
                                        <Text style={styles.mainBoxItemAreaName}>{item.area_v2_name}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }

                </View>
            </View >
        )
    }
    //渲染其他直播模块
    _readerBoxOther = (list, title, num, index) => {
        return (
            <View style={styles.livebox} key={index}>
                <View style={styles.titleBox}>
                    <Text style={styles.leftText}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.rightText} onPress={this._toMoreDiantai}>查看更多</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 12, color: '#888' }}>&#xe693;</Text>
                    </View>
                </View>
                <View style={styles.mianBox}>
                    {
                        list.map((item, index) => {
                            if (index < num) {
                                return <TouchableHighlight style={styles.itemBox}
                                    key={index}
                                    onPress={() => this._toDiantai(item)}
                                    underlayColor="#f3f3f3">
                                    <LiveItemUI
                                        title={item.title}
                                        type={item.area_v2_name}
                                        cover={item.cover}
                                        pendentPic={item.pendent_ru_pic}
                                        pendentRu={item.pendent_ru}
                                        uname={item.uname}
                                        onlineNum={numFormat(item.online)}
                                    ></LiveItemUI>
                                </TouchableHighlight>
                            }
                        })
                    }

                </View>
            </View>
        )
    }

    // 主体渲染
    renderBody = () => {
        return (
            <View>
                {this._renderBanner()}
                {this._renderIconList()}
                {this._readerRecommendBox()}
                {this._renderHourOrder()}
                {
                    [
                        this.state.audioLiveInfo,
                        this.state.videoLiveInfo,
                        this.state.pvpLiveInfo,
                        this.state.netGameLiveInfo,
                        this.state.mobileGameLiveInfo,
                        this.state.localGameLiveInfo,
                        this.state.recreationLiveInfo,
                        this.state.paintingLiveInfo,
                    ].map((item, index) => {
                        return this._readerBoxOther(item.list, item.module_info.title, 4, index)
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        colors={['#fb7b9e']}
                    />}>
                    {this.state.isloading ? this.renderBody() : null}
                </ScrollView>
            </View>
        )
    }

    //推荐模块换一换功能
    _changeRecommentList = () => {
        this.state.doRotate.setValue(0);
        Animated.timing(                  // 随时间变化而执行动画
            this.state.doRotate,                       // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 1000,              // 让动画持续一段时间
            }
        ).start();

        if (this.state.changeNum >= 3) {
            this.setState({
                changeNum: 0,
                rotate: this.state.rotate + 1,
            })
        } else {
            this.setState({
                changeNum: this.state.changeNum + 1,
                rotate: this.state.rotate + 1
            })
        }
    }

}
const styles = StyleSheet.create({
    box: {
        width: '20%',
        alignItems: 'center',
        marginTop: 5
    },
    livebox: {
        marginTop: 15,
        paddingTop: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 0.2
    },
    titleBox: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 30,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftText: {
        fontSize: 14
    },
    rightText: {
        marginRight: 5,
        fontSize: 12,
        color: '#888'
    },
    mianBox: {
        paddingLeft: '2%',
        paddingRight: '2%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemBox: {
        width: '49%',
    },
    //小时排行
    hourOrderBox: {
        borderTopColor: '#ccc',
        borderTopWidth: 0.2,
        paddingTop: 10,
    },
    headBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    headBoxLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headBoxRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    hourTitle: {
        fontSize: 14,
        marginRight: 5
    },
    subHourTitle: {
        fontSize: 12,
        color: '#888'
    },
    mainBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    mainBoxItem: {
        paddingTop: 25,
        alignItems: 'center',
        width: '30%'
    },
    mainBoxItemBgA: {
        // height: 50,
        // width: 50,
    },
    mainBoxItemCoverA: {
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'skyblue'
    },
    mainBoxItemUname: {
        marginTop: 5,
        fontSize: 14,
    },
    mainBoxItemAreaName: {
        fontSize: 12,
        color: '#888'
    },
    topBox: {
        position: 'relative',
        alignItems: 'center',
    },
    rank: {
        position: 'absolute',
        top: '-12%',
        left: '7%',
        fontSize: 10,
        fontWeight: '700',
        color: '#666',
        transform: [{ rotate: '-30deg' }]
    },
    topImg: {
        position: 'absolute',
        top: '-40%',
        left: '-7%',
        width: 75,
        height: 60,
        transform: [{ rotate: '-15deg' }]
    },
    liveStatus: {
        paddingLeft: 2,
        paddingRight: 2,
        position: 'absolute',
        bottom: 0,
        right: 2,
        backgroundColor: '#fff',
        color: '#fb7b9e',
        borderColor: '#fb7b9e',
        borderWidth: 0.4,
        borderRadius: 12,
        fontSize: 10
    }
})





export default Live;