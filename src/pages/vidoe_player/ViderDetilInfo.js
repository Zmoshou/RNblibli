import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, FlatList, Image } from 'react-native'
import { numFormat, } from '../../utils/utils';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { timeFormat } from '../../utils/utils';

import ListItemUI from '../../components/ListItemUI';

class VideoDetil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            partSelect: 0
        }
    }

    //详情信息渲染
    _renderInfo = (item) => {
        return (
            <View>
                <View style={styles.topBox}>
                    <View style={styles.upInfo}>
                        <View style={styles.upInfoLeft}>
                            <View style={styles.upCover}>
                                <Image source={{ uri: item.owner && item.owner.face }} style={styles.upImg} />
                            </View>
                            <View style={styles.upTitle}>
                                <Text style={item.owner_ext.vip.vipStatus == 0 ? styles.upname : styles.vipUpname}>{item.owner && item.owner.name}</Text>
                                <Text style={styles.fans}>{numFormat(item.owner_ext && item.owner_ext.fans)}粉丝</Text>
                            </View>
                        </View>
                        <View style={styles.upInfoRight}>
                            <Text style={styles.upFocus}>＋ 关注</Text>
                        </View>
                    </View>
                    <View style={styles.videoInfo}>
                        <View style={styles.videoInfoTopBox}>
                            <Text style={styles.videoTitle}>{item.title}</Text>
                            {/* <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text> */}
                            {this.state.show ? <Text style={styles.arrorDown}>&#xe69b;</Text>
                                : <Text style={styles.arrorDown}>&#xe694;</Text>}
                        </View>
                        <View style={styles.AVnumBox}>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={{ fontFamily: 'iconfont', color: '#888' }}>&#xe66d;</Text>
                                <Text style={styles.AVnumBoxItemText}>{numFormat(item.stat && item.stat.view)}</Text>
                            </View>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={{ fontFamily: 'iconfont', color: '#888' }}>&#xe66a;</Text>
                                <Text style={styles.AVnumBoxItemText}>{numFormat(item.stat && item.stat.danmaku)}</Text>
                            </View >
                            <View style={styles.AVnumBoxItem}>
                                <Text style={styles.AVnumBoxItemText}>
                                    {moment(item.ctime * 1000).format('YYYY-MM-DD')}
                                </Text>
                            </View>
                            <View style={styles.AVnumBoxItem}>
                                <Text style={styles.AVnumBoxItemText}>AV {item.aid}</Text>
                            </View>
                        </View>
                        <View style={styles.AVnumBoxHideDesc}>
                            <Text style={styles.ItemDescText}>{item.desc}</Text>
                            {/* {this.state.show ? <Text style={styles.ItemDescText}> {item.desc}</Text> : null} */}
                        </View>
                    </View>
                    <View style={styles.statBox}>
                        <TouchableHighlight
                            style={styles.statItem}
                            onPress={() => { }}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe6c7;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.like)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe6c6;</Text>
                                <Text style={styles.statItemText}>不喜欢</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe670;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.coin)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe673;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.favorite)}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => { }}
                            style={styles.statItem}
                            underlayColor="#f3f3f3">
                            <View>
                                <Text style={styles.iconStyle}>&#xe671;</Text>
                                <Text style={styles.statItemText}>{numFormat(item.stat && item.stat.share)}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {item.pages && item.pages.length > 1 ? this._renderChangeVideo(item.pages) : null}
                </View>
            </View>
        )
    }

    //列表元素按下事件
    _toVideoPageOnPress(item) {
        Actions.VideoPage({ 'aid': item.param })
    }

    changeVideo = (item, index) => {
        if (this.state.partSelect != index) {
            this.setState({
                partSelect: index
            })
            this.props.getVideoPlayerData(item.cid);
            this._flatList.scrollToIndex({ viewPosition: 0, animated: true, index });
        }
    }

    //渲染多段视频切换
    _renderChangeVideo = (pages) => {
        return (
            <FlatList
                ref={(flatList) => this._flatList = flatList}
                style={{ margin: 5 }}
                data={pages}
                renderItem={({ item, index }) => this._renderPagesItem(item, index)}
                keyExtractor={(item, index) => index}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        )
    }
    //多个视频
    _renderPagesItem = (item, index) => {
        return (
            <TouchableHighlight
                onPress={() => { this.changeVideo(item, index) }}
                style={[styles.pagesPart, this.state.partSelect === index ? styles.pagesSelectPart : null]}
                underlayColor="#f3f3f3">
                <Text
                    style={this.state.partSelect === index ? { color: '#fb7b9e' } : { color: '#000' }}
                    numberOfLines={2} >{item.part}</Text>
            </TouchableHighlight>
        )
    }

    //相关推荐列表渲染
    _renderItem = (item, index) => {
        return (
            <TouchableHighlight
                onPress={() => this._toVideoPageOnPress(item)}
                underlayColor="#f3f3f3"
            >
                <ListItemUI
                    cover={item.pic}
                    title={item.title}
                    upname={item.owner.name}
                    playNum={item.stat.view}
                    danmaku={numFormat(item.stat.danmaku)}
                    time={timeFormat(item.duration)}
                    tags={item.rec_tags ? item.rec_tags : null}
                ></ListItemUI>
            </TouchableHighlight >
        )
    }

    render() {
        return (
            <FlatList
                data={this.props.VideoDetilData.relates}
                renderItem={({ item, index }) => this._renderItem(item, index)}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={this._renderInfo(this.props.VideoDetilData)}
            />
        );
    }
}

const styles = StyleSheet.create({
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
        color: '#444',
        fontSize: 12.5
    },
    vipUpname: {
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
        width: 28,
        height: 18,
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
    },
    //横向列表
    pagesPart: {
        width: 125,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 8,
        borderWidth: 0.8,
        borderRadius: 5,
        borderColor: '#ccc',
        fontSize: 14,
        color: '#000'
    },
    pagesSelectPart: {
        borderColor: '#fb7b9e',
    }
})

export default VideoDetil;