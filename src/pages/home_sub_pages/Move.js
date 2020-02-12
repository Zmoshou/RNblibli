import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, RefreshControl, ScrollView } from 'react-native';

import BmSwiper from '../../components/Bangumi/BmSwiper';
import BanItem from '../../components/Bangumi/BanItem';
import MoveItem from '../../components/Move/MoveItem';


const BannerWidth = (Dimensions.get('window').width * 0.96);
const BannerHeight = 180;
//轮播图片数据
const swiperImages = [
    {
        id: 1,
        pic: "http://i0.hdslb.com/bfs/bangumi/6a11174b96970c2239f9f5064c57e59af70171a6.jpg",
        title: "吴青峰：怼粉这种事，都是靠灵感"
    },
    {
        id: 2,
        pic: "http://i0.hdslb.com/bfs/bangumi/4c58a6e3d6c9901251250ee4ef9ff5696e3c1db0.jpg",
        title: "中国千年的礼乐智慧"
    },
    {
        id: 3,
        pic: "http://i0.hdslb.com/bfs/bangumi/98182d952ce44c6d378be97264e7bda0b0fd4c88.jpg",
        title: "一群有能力、有怪癖又可爱的退休警察们"
    },
    {
        id: 4,
        pic: "http://i0.hdslb.com/bfs/bangumi/923bfb36c57cd643afb6a6c48594695372ff4a72.jpg",
        title: "破解冻土难题，改写国际预言"
    },
    {
        id: 5,
        pic: "http://i0.hdslb.com/bfs/bangumi/5afd0231d665fd2ee29c376c292a8b3f0203384b.jpg",
        title: "实拍战机空中机油"
    },
];



//导航栏图标资源
const icons = [
    {
        id: 1,
        pic: "http://i0.hdslb.com/bfs/bangumi/85e80d8bb430e76eb3e55bbf93d8a62a51e2a774.png",
        title: "纪录片"
    },
    {
        id: 2,
        pic: "http://i0.hdslb.com/bfs/bangumi/a1901aedc680a77c808787cb2cf8e22c7b9c359b.png",
        title: "电影"
    },
    {
        id: 3,
        pic: "http://i0.hdslb.com/bfs/bangumi/21bd3247c745e3f1eb489bf637215f8cc8aa86ca.png",
        title: "电视剧"
    },
    {
        id: 4,
        pic: "http://i0.hdslb.com/bfs/bangumi/76c03a7ca20815765c7f5bc17d320e0676e15a20.png",
        title: "索引"
    },
    {
        id: 5,
        pic: "http://i0.hdslb.com/bfs/bangumi/e713a764f9146b73673ba9b126d963aa50f4fc3b.png",
        title: "热门榜单"
    }

];

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentaryList: [],
            moveList: [],
            dramaList: [],
            refreshing: true,
            show: false,
            documentaryNum: 0,
            moveNum: 0,
            dramaNum: 0
        }
    }
    componentDidMount() {
        this.getDataList();
    }
    //封装请求方法
    getData = (type) => {
        const url = `https://api.bilibili.com/pgc/web/rank/list?day=3&season_type=${type}`;
        return new Promise((reslove, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    reslove(data)
                })
        })
    }

    //发送请求获取数据
    getDataList = async () => {
        let res = await Promise.all([this.getData(2), this.getData(3), this.getData(5)])
        if (res[0].code === 0 && res[1].code === 0 && res[1].code === 0) {
            this.setState({
                moveList: res[0].result.list,
                documentaryList: res[1].result.list,
                dramaList: res[2].result.list,
                show: true,
                refreshing: false,
            })
        }
    }

    //下拉刷新
    _onRefresh = () => {
        this.setState({
            refreshing: true,
        })
        this.getDataList();
    }
    //电影热播换一换
    handleMoveNumChange = () => {
        if (this.state.moveNum < 3) {
            this.setState({
                moveNum: this.state.moveNum + 1
            })
        } else {
            this.setState({
                moveNum: 0
            })
        }
    }
    //纪录片换一换
    handleDocumentaryNumChange = () => {
        if (this.state.documentaryNum < 3) {
            this.setState({
                documentaryNum: this.state.documentaryNum + 1
            })
        } else {
            this.setState({
                documentaryNum: 0
            })
        }
    }
    //电视剧换一换
    handleDramaNumChange = () => {
        if (this.state.dramaNum < 3) {
            this.setState({
                dramaNum: this.state.dramaNum + 1
            })
        } else {
            this.setState({
                dramaNum: 0
            })
        }
    }

    /* 导航栏  */
    _renderNavbar = () => {
        return (
            < View style={{ width: "100%", alignItems: "center", marginTop: 15, marginBottom: 15, flexDirection: 'row' }} >
                {icons.map((item, index) => {
                    return (
                        <View key={index} style={{ flex: 1, alignItems: 'center' }}>
                            <Image source={{ uri: item.pic }} style={{ width: 28, height: 28 }}></Image>
                            <Text style={{ fontSize: 12, textAlign: "center", color: '#666' }}>{item.title}</Text>
                        </View>
                    );
                })}
            </View >
        )
    }

    _renderBody = () => {
        return (
            <View>
                {/* 轮播图片 */}
                <BmSwiper imgSource={swiperImages}></BmSwiper>
                {/* 导航栏 */}
                {this._renderNavbar()}
                <MoveItem
                    dataSource={this.state.documentaryList.slice(this.state.documentaryNum * 6, (this.state.documentaryNum + 1) * 6)}
                    title={"纪录片热播"}
                    num={this.state.documentaryNum}
                    maxNum={4}
                    handleChange={this.handleDocumentaryNumChange}
                ></MoveItem>
                <MoveItem
                    dataSource={this.state.moveList.slice(this.state.moveNum * 6, (this.state.moveNum + 1) * 6)}
                    title={"电影热播"}
                    num={this.state.moveNum}
                    maxNum={4}
                    handleChange={this.handleMoveNumChange}
                ></MoveItem>
                <BanItem
                    dataSource={this.state.dramaList.slice(this.state.dramaNum * 6, (this.state.dramaNum + 1) * 6)}
                    title={"电视剧热播"}
                    num={this.state.dramaNum}
                    maxNum={4}
                    handleChange={this.handleDramaNumChange}
                    coverMode={1}
                ></BanItem>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={['#fb7b9e']}
                        />}>
                    {this.state.show ? this._renderBody() : null}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //导航栏样式
    box: {
        width: "100%",
        alignItems: "center",
    },
});

export default Movie;