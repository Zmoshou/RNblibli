/**
 * 朱继王超
 * 2019-12-09
 * 首页-热门
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, RefreshControl, Image, FlatList, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux';


class Hot extends Component {
    constructor(props) {
        super(props);
        this.panResponder = {}
        this.state = {
            hotList: [],
            topItem: [],
            refreshing: false,
            page: 0,
            footerFlag: 0,
        }
    }

    componentDidMount() {
        this.setState({ refreshing: true })
        this.dataInit();
    }

    //请求数据
    fetchData = (page) => {
        return new Promise((resolve, react) => {
            const url = `https://app.bilibili.com/x/v2/show/popular/index?build=5470400&mobi_app=android&idx=${this.state.page * 10}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 0) {
                        resolve(data);
                    }
                })
        })
    }

    dataInit = async () => {
        let data = await this.fetchData();
        let topItems = data.config.top_items;
        let dataList = data.data;
        console.warn(topItems);
        this.setState({
            refreshing: false,
            topItem: topItems,
            hotList: dataList,
            page: 1
        })
    }

    //下拉刷新
    _onRefresh = async () => {
        this.setState((oldState) => {
            return {
                refreshing: true,
                page: 0,
                footerFlag: 0,
            }
        }, this.dataInit)
    }

    //上拉加载
    _onEndReached = async () => {
        console.warn(this.state.page);
        
        if (this.state.page < 10) {
            let data = await this.fetchData();
            let dataList = data.data;
            this.setState({
                refreshing: false,
                hotList: [...this.state.hotList, ...dataList],
                page: this.state.page  + 1
            })
        } else {
            this.setState({
                footerFlag: 1
            })
        }
    }

    //列表尾部渲染
    _renderFooter = () => {
        if (this.state.footerFlag === 1) {
            return (
                <View style={styles.footerBox}>
                    <Text style={styles.footerTitle}>已经到达热门的尽头惹，<Text style={{ color: '#fb7b9e' }}>关于热门</Text></Text>
                </View>
            )
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    //列表元素按下事件
    _toVideoPageOnPress(item) {
        Actions.VideoPage({ 'aid': item.param })
    }

    //渲染top图标
    _renderTopItem = () => {
        return this.state.topItem.map((item, index) => {
            if (item.entrance_id == 4 || item.entrance_id == 5 || item.entrance_id == 6) {
                return (
                    <View style={styles.topItem} key={index}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={{ uri: item.icon }}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                )
            }
        })
    }

    //热门列表渲染
    _renderHotList = () => {
        return ({ item, index }) => {
            if (item.card_type === "three_item_all_v2") {
                return this._renderHotListItemB(item)
            } else {
                return this._renderHotListItem(item, index);
            }
        }
    }

    //推荐理由样式
    _setRcmdReasonStyle = (item) => {
        if (item.rcmd_reason_style && item.rcmd_reason_style.bg_style === 1 ||
            item.top_rcmd_reason_style && item.top_rcmd_reason_style.bg_style === 1
        ) {
            return styles.rcmdReasonTextA
        } else if (item.rcmd_reason_style && item.rcmd_reason_style.bg_style === 2 ||
            item.top_rcmd_reason_style && item.top_rcmd_reason_style.bg_style === 2
        ) {
            return styles.rcmdReasonTextB
        }
        return;
    }


    //热门列表渲染每个item
    _renderHotListItem = (item, index) => {
        return <TouchableHighlight
            onPress={() => this._toVideoPageOnPress(item)}
            underlayColor="#f3f3f3"
        >
            <View style={styles.hotItem}>
                <View style={styles.hotItemLeft}>
                    <Image style={styles.itemImage}
                        source={{ uri: item.cover }} />
                    <Text style={styles.time}>{item.cover_right_text_1}</Text>
                </View>
                <View style={styles.hotItemRight}>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.itemTitle}>{item.title}</Text>
                    <View>
                        <View style={styles.recmView}>
                            <Text style={this._setRcmdReasonStyle(item)}>{item.rcmd_reason_style && item.rcmd_reason_style.text}</Text>
                        </View>
                        <Text style={styles.desc}>{item.right_desc_1}</Text>
                        <Text style={styles.desc}>{item.right_desc_2}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    }

    //横向滚动列表样式
    _renderHotListItemB = (item) => {
        return (
            <View style={styles.hotItemRcmd}>
                <View style={styles.rcmdTop}>
                    <View style={styles.rcmdTopLeft}>
                        <Image style={styles.upCover} source={{ uri: item.cover }} />
                        <View style={styles.upInfoBox}>
                            <Text style={styles.upName}>{item.title}</Text>
                            <View style={styles.recmView}>
                                <Text style={this._setRcmdReasonStyle(item)}>{item.top_rcmd_reason_style && item.top_rcmd_reason_style.text}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rcmdTopRight}>
                        <Text style={styles.concern}>＋ 关注</Text>
                    </View>
                </View>
                <View style={styles.rcmdBody}>
                    <FlatList
                        data={item.item}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderthreeItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    //渲染横向滚动元素
    _renderthreeItem = ({ item }) => {
        return (
            <TouchableHighlight
                onPress={() => this._toVideoPageOnPress(item)}
                underlayColor="#f3f3f3"
            >
                <View
                    style={styles.threeItem}>
                    <View style={styles.threeItemCoverBox}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: 2 }} source={{ uri: item.cover }} />
                    </View>
                    <Text numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.hotList}
                    renderItem={this._renderHotList()}
                    keyExtractor={(item, index) => item.param + index}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={2}
                    ListHeaderComponent={() => {
                        return (<View style={styles.topItemList}>
                            {this._renderTopItem()}
                        </View>)
                    }}
                    ListFooterComponent={this._renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={['#fb7b9e']}
                        />}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    topItemList: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    topItem: {
        alignItems: 'center',
        width: '33%'
    },
    title: {
        marginTop: 4,
        fontSize: 12,
        color: '#444'
    },
    hotItem: {
        height: 120,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        padding: 10,
        flexDirection: 'row'
    },
    hotItemLeft: {
        width: '45%',
        height: '100%',
        position: 'relative'
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    time: {
        position: 'absolute',
        bottom: 8,
        right: 5,
        fontSize: 12,
        padding: 4,
        paddingTop: 2,
        paddingBottom: 2,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 2,
        color: '#fff'
    },
    hotItemRight: {
        width: '55%',
        height: '100%',
        paddingLeft: 8,
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontSize: 14,
        color: '#000',
        width: '100%',
        overflow: 'hidden',
    },
    desc: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    recmView: {
        position: 'relative',
        height: 20
    },
    rcmdReasonTextA: {
        paddingLeft: 2,
        paddingRight: 2,
        borderWidth: 1,
        borderRadius: 2,
        fontSize: 10,
        bottom: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: '#f5992a',
        borderColor: '#f5992a',
        color: '#fff'
    },
    rcmdReasonTextB: {
        paddingLeft: 2,
        paddingRight: 2,
        borderWidth: 1,
        borderRadius: 2,
        fontSize: 10,
        bottom: 0,
        left: 0,
        position: 'absolute',
        borderColor: '#fdd849',
        color: '#fdd849'
    },
    hotItemRcmd: {
        height: 200,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 0.5,
        padding: 10
    },
    rcmdTop: {
        height: '28%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rcmdTopLeft: {
        flexDirection: 'row',
    },
    upCover: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginRight: 5
    },
    upInfoBox: {
        position: 'relative',
        width: '60%'
    },
    upName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000'
    },
    rcmdTopRight: {
        height: '50%',
        width: '20%',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#fb7b9e',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    concern: {
        fontSize: 12,
        color: '#fb7b9e'
    },
    rcmdBody: {
        height: '75%',
    },
    threeItem: {
        width: 150,
        height: '100%',
        marginRight: 10
    },
    threeItemCoverBox: {
        width: '100%',
        height: '70%',
    },
    footerBox: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTitle: {
        fontSize: 12,
        color: '#ccc'
    }
})

export default Hot;