import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, Image, Dimensions, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { Card } from 'react-native-shadow-cards';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 100;

export default class MovieListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            banners: [],
            goodList: [],
            blocks: [],
            notice: {},
            page: 17
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const url = `https://mall.bilibili.com/mall-c/home/index/v2?mVersion=${this.state.page}`
        fetch(url).then(res => res.json())
            .then(data => {
                this.setState({
                    tabs: data.data.vo.tabs,
                    banners: data.data.vo.banners,
                    blocks: data.data.vo.blocks,
                    notice: data.data.vo.notice,
                    goodList: this.state.goodList.concat(data.data.vo.feeds.list),
                    isloading: false,
                    refreshing: false
                })
            })
    }

    toWebView = (url, title) => {
        Actions.webView({ 'webUrl': url, title: title })
    }

    //下拉加载
    _onEndReached = () => {
        this.getData();        
    }


    _renderTop = () => {
        return (
            <>
                {this._renderSerch()}
                {this._renderIcon()}
                {this._renderBlocks()}
                {this._renderNotice()}
                {this._renderBanners()}
            </>
        )
    }

    _renderSerch = () => {
        return (
            <View style={styles.search}>
                <Text style={{ fontFamily: 'iconfont', color: '#fb7b9e' }}>&#xe669;</Text>
                <Text style={styles.seachInput}>抱团购</Text>
            </View>
        )
    }

    _renderIcon = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <FlatList
                    data={this.state.tabs}
                    numColumns={5}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, i }) => {
                        return (
                            <TouchableHighlight
                                onPress={() => this.toWebView(item.jumpUrlH5, item.name)}
                                underlayColor="#f3f3f3"
                                key={i} style={{ flex: 1, alignItems: 'center' }}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ width: 60, height: 60 }} source={{ uri: `http:${item.imageUrl}` }} ></Image>
                                    <Text>{item.name}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }}
                />
            </View>
        )
    }

    _renderBlocks = () => {
        return <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {this.state.blocks.map((item, index) => {
                let imgUrl = 'http:' + item.imageUrl
                return (
                    <TouchableHighlight
                        key={index}
                        onPress={() => this.toWebView(item.jumpUrlH5)}
                        underlayColor="#f3f3f3">
                        <Image source={{ uri: imgUrl }} resizeMode={'stretch'} style={{ width: 110, height: 50 }} />
                    </TouchableHighlight>
                )
            })}
        </View>
    }

    _renderNotice = () => {
        return <Text onPress={() => { this.toWebView(this.state.notice.jumpUrlH5, this.state.notice.title) }} style={styles.notice}>{this.state.notice.title}</Text>
    }

    _renderBanners = () => {
        return (
            <View style={{
                marginVertical: 10, height: 100, borderRadius: 6, overflow: 'hidden'
            }}>
                {this.state.banners.length ? <Swiper
                    dot={<View style={{ backgroundColor: '#fff', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: '#fb7b9e', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{ bottom: 5, left: null, right: 12 }}
                    autoplay={true}
                    autoplayTimeout={4}>
                    {this.state.banners.map((item, index) => {
                        const imgUrl = 'https:' + item.pic;
                        const url = item.url;
                        const name = item.name;
                        return (
                            <TouchableHighlight
                                onPress={() => this.toWebView(url, name)}
                                underlayColor="#f3f3f3"
                                key={index} >
                                <Image style={{ width: '100%', height: 100 }} resizeMode={'stretch'} source={{ uri: imgUrl }} />
                            </TouchableHighlight>
                        )
                    }
                    )}
                </Swiper> : null}
            </View >)
    }

    //渲染列表
    _renderHotList = ({ item, index }) => {
        const url = item.jumpUrls[0]
        const title = item.title;
        let img = null;
        const type = item.type

        switch (type) {
            case 'mallitems':
                img = `http:${item.imageUrls[0]}`
                break;
            case 'ugcs':
                img = `http:${item.itemImg}`
                break;
            case 'ticketproject':
                img = `http:${item.imageUrls[0]}`
                break;
            case 'picture':
                img = item.imageUrls[0];
                break;
            default:
                break;
        }

        return (
            <TouchableHighlight
                onPress={() => this.toWebView(url)}
                underlayColor="#f3f3f3"
                style={{ margin: 5, height: 250,flex:1 }}>
                <Card cornerRadius={5} opacity={0.7} elevation={2} style={styles.itemBox}>
                    {/* @550w_480h参数可调 */}
                    <Image style={styles.showImg} resizeMode={'stretch'} source={{ uri: `${img}@800w_900h.png` }}></Image>
                    <View style={styles.desc}>
                        <Text style={styles.title} numberOfLines={2}>{title}</Text>
                    </View>
                </Card>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, overflow: 'hidden' }} >
                <FlatList
                    style={{ paddingHorizontal: 10 }}
                    data={this.state.goodList}
                    numColumns={2}
                    renderItem={this._renderHotList}
                    keyExtractor={(item, index) => index}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={1}
                    ListHeaderComponent={this._renderTop}
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
    search: {
        marginVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f2f2f5',
        marginHorizontal: 12,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    seachInput: {
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10
    },
    notice: {
        paddingVertical: 6,
        marginVertical: 8,
        borderRadius: 4,
        textAlign: 'center',
        color: '#fb7b9e',
        fontSize: 12,
        backgroundColor: '#f1f1f1',
        fontWeight: '700'
    },
    itemBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    desc: {
        height: '28%',
        width: '100%',
        padding: 8
    },
    showImg: {
        height: '72%',
        width: '100%'
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontWeight: '700'
    }
});