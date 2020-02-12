import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, RefreshControl, ScrollView, ImageBackground, TouchableHighlight } from 'react-native'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 80;
const images = [
    "http://i0.hdslb.com/bfs/archive/fc523c90d05bade49143294262a3a297da2a5d55.jpg",
    "http://i0.hdslb.com/bfs/archive/77da52bb418a4d7f959805d68779cc677c0cb71c.jpg",
    "http://i0.hdslb.com/bfs/archive/02127e444fd82aab723c7747f57d5c903c602605.jpg"
];
class SeventyYears extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: "15500607",
                url: "http://i1.hdslb.com/bfs/archive/69b341351180227d90b54cd61297177b643642c5.jpg",
                tit: "91岁仍坚守方桌，剪艺宗师袁秀莹与她的剪纸人生",
                class: "趣味科普人文",
                bof: "4.6万",
                danm: "163",
                time: "3:23"
            },
            {
                id: "10146180",
                url: "http://i0.hdslb.com/bfs/archive/0baf3c2bc01200caecffdefd1eb9908d474aa4ac.jpg",
                tit: "被称为中国三宝之一的它，却不及日本，面临失传",
                class: "趣味科普人文",
                bof: "14.4万",
                danm: "296",
                time: "4:17"
            },
            {
                id: "13963830",
                url: "http://i0.hdslb.com/bfs/archive/2356a444ee4dd26bb830fe834dd3d1dddb4af955.jpg",
                tit: "从一根青竹变成一摞纸，都发生了什么？",
                class: "趣味科普人文",
                bof: "9.2万",
                danm: "546",
                time: "3:02"
            },
            {
                id: "15902489",
                url: "http://i2.hdslb.com/bfs/archive/2d21750c9cd9a3707c583a98e4a8fff3000c1c3e.jpg",
                tit: "他用编竹子的手艺，编出了年收108亿的传奇",
                class: "趣味科普人文",
                bof: "7.1万",
                danm: "362",
                time: "4:25"
            }],
            pdata: [
                {
                    url: "http://i1.hdslb.com/bfs/archive/685562c7df25a391723490d36354fd1440c0e2d4.jpg",
                    id: "68129825",
                    tit: "外交高手”大熊猫：为国卖萌，应该的",
                    bof: "9968",
                    danm: "412"
                },
                {
                    url: "http://i0.hdslb.com/bfs/archive/ee5829877e348ca9b69e7fb88dd72e3925514dce.jpg",
                    id: "68098480",
                    tit: "黄河亮了！“人民红”点亮黄河沿岸 向祖国表白",
                    bof: "2381",
                    danm: "259"
                },
                {
                    url: "http://i2.hdslb.com/bfs/archive/05d92363b590b1bf013dd6f9d3377d16e5557740.png",
                    id: "3924328",
                    tit: "我在故宫修文物（2016）",
                    bof: "532.4万",
                    danm: "10万"
                }

            ],
            refreshing: true,
            show: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                refreshing: false,
                show: true
            })
        }, 2000)
    }

    //列表元素按下事件
    _toVideoPageOnPress(item) {
        Actions.VideoPage({ 'aid': item.id })
    }

    _renderSwiper = () => {
        const URL = 'http://i0.hdslb.com/bfs/archive/2e92d79c8a2a5a87f0d91ab1d493d09f5c1b2ec6.jpg'
        return (
            <View>
                <ImageBackground source={{ uri: URL }} style={styles.bgPic}>
                    <View style={styles.swiperContainer}>
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
                            {images.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Image style={{ width: '100%', height: BannerHeight }} source={{ uri: item }} />
                                    </View>
                                );
                            })}
                        </Swiper>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    _renderBody = () => {
        return (
            <View>
                {this._renderSwiper()}
                <View style={{ marginTop: 18, paddingLeft: '2%', marginBottom: 5 }}><Text>手造中国</Text></View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.state.data.map((item, index) => {
                        return (
                            <TouchableHighlight
                                key={index}
                                onPress={() => this._toVideoPageOnPress(item)}
                                underlayColor="#f3f3f3"
                                style={{ marginLeft: '2%', width: '47%', marginBottom: 8 }}
                            >
                                <View style={{ backgroundColor: '666' }}>
                                    <View style={{ height: 90 }}>
                                        <Image source={{ uri: item.url }} style={styles.statepic}></Image>
                                    </View>
                                    <View style={{ marginTop: -18 }}>
                                        <ImageBackground source={require('../../assets/images/jianbian.png')} style={{ width: '100%', height: 20, opacity: 0.9 }}>
                                            <View style={{ flexDirection: 'row', paddingLeft: '2%' }}>
                                                <Text style={{ fontFamily: 'iconfont', fontSize: 15, color: 'white' }}>&#xe66d;</Text>
                                                <Text style={{ fontSize: 12, color: 'white' }}>{item.bof}</Text>
                                                <Text style={{ fontFamily: 'iconfont', fontSize: 15, color: 'white' }}>&#xe66a;</Text>
                                                <Text style={{ fontSize: 12, color: 'white' }}>{item.danm}</Text>
                                                <Text style={{ fontSize: 12, color: 'white', marginLeft: '25%' }}>{item.time}</Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <View style={styles.borderpic}>
                                        <View >
                                            <Text numberOfLines={2} style={{ fontSize: 14, paddingLeft: '4%', paddingRight: "5%" }}>{item.tit}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 12, color: "#888", marginTop: 12, paddingBottom: 10, paddingLeft: '4%' }}>{item.class}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )
                    })}
                </View>
                {
                    this.state.pdata.map((item, index) => {
                        return (
                            <View key={index} style={{ marginLeft: '2%', marginRight: '2%', marginBottom: 8 }}>
                                <View>
                                    <Image source={{ uri: item.url }} style={{ width: '100%', height: 170, borderRadius: 5 }}></Image>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 14, paddingLeft: '2%', marginTop: -164, color: 'white' }}>{item.tit}</Text>
                                </View>
                                <View>
                                    <Image source={require("../../assets/images/ic_tv_play.png")} style={{ height: 40, width: 40, marginLeft: '86%', marginTop: -50 }}></Image>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: -20 }}>
                                    <Text style={{ fontFamily: 'iconfont', fontSize: 15, color: 'white', marginLeft: '3%' }}>&#xe66d;</Text>
                                    <Text style={{ fontSize: 12, color: 'white', marginLeft: 3 }}>{item.bof}</Text>
                                    <Text style={{ fontFamily: 'iconfont', fontSize: 15, color: 'white' }}>&#xe66a;</Text>
                                    <Text style={{ fontSize: 12, color: 'white' }}>{item.danm}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{ height: "100%" }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        colors={['#fb7b9e']}
                    />}>
                {this.state.show ? this._renderBody() : null}
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    statepic: {
        width: '100%',
        height: 90,
        borderRadius: 6,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    bgPic: {
        width: "100%",
        height: 150,
        position: 'relative',
        marginBottom: 8,
        alignItems: 'center'
    },
    swiperContainer: {
        position: 'absolute',
        height: 80,
        width: '80%',
        bottom: -20,
        borderRadius: 6,
        overflow: 'hidden'
    },
    borderpic: {
        // borderStyle: "solid",
        // borderColor: '#888',
        // borderRightWidth: 0.3,
        // borderLeftWidth: 0.3,
        // borderBottomWidth: 0.3,
        paddingTop: 15,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },

});

export default SeventyYears;