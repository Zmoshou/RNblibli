import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, ScrollView, RefreshControl, TouchableHighlight, ImageBackground } from 'react-native';
import Swiper from 'react-native-swiper'
import BanItem from '../../components/Bangumi/BanItem';
import BmSwiper from '../../components/Bangumi/BmSwiper'

const BannerWidth = (Dimensions.get('window').width * 0.96);
const BannerHeight = 180;

//轮播图片数据
const swiperImages = [
    {
        id: 1,
        pic: "http://i0.hdslb.com/bfs/bangumi/a085f60bda7f18226accf3993b328e17f419c00d.jpg",
        title: "FGO动画专题页"
    },
    {
        id: 2,
        pic: "http://i0.hdslb.com/bfs/bangumi/8c39135d5191acbe0f0108ede3dbc76b6342cd36.jpg",
        title: "少女前线 人形小剧场：第9话"
    },
    {
        id: 3,
        pic: "http://i0.hdslb.com/bfs/bangumi/105c45fa8538c897e85e44f3811eda2de2d79b85.jpg",
        title: "风起绿林"
    },
    {
        id: 4,
        pic: "http://i0.hdslb.com/bfs/bangumi/20429c37693f67e5310f3b4d02f96c2b7403a6ec.jpg",
        title: "【一周资讯】第37期"
    },
];



//导航栏图标资源
const icons = [
    {
        id: 1,
        pic: "http://i0.hdslb.com/bfs/bangumi/125ba229db0dcc3b5a9fe110ba3f4984ddc2c775.png",
        title: "番剧"
    },
    {
        id: 2,
        pic: "http://i0.hdslb.com/bfs/bangumi/2c782d7a8127d0de8667321d4071eebff01ea977.png",
        title: "国创"
    },
    {
        id: 3,
        pic: "http://i0.hdslb.com/bfs/bangumi/7a7d9db1911b7cbfdad44ae953dd5acc49ef5187.png",
        title: "时间表"
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

class Bangumi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bangumiList: [],
            guoChuangList: [],
            refreshing: true,
            show: false,
            recommednNum: 0,
            funNum: 0,
            guoNum: 0
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
        let res = await Promise.all([this.getData(1), this.getData(4)])
        if (res[0].code === 0 && res[1].code === 0) {
            this.setState({
                bangumiList: res[0].result.list,
                guoChuangList: res[1].result.list,
                show: true,
                refreshing: false,
            })
        }
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true,
        })
        this.getDataList();
    }
    //番剧推荐换一换
    handleFunNumChange = () => {
        if (this.state.funNum < 3) {
            this.setState({
                funNum: this.state.funNum + 1
            })
        } else {
            this.setState({
                funNum: 0
            })
        }
    }
    //兴趣推荐换一换
    handleRecommednNumChange = () => {
        if (this.state.recommednNum < 3) {
            this.setState({
                recommednNum: this.state.recommednNum + 1
            })
        } else {
            this.setState({
                recommednNum: 0
            })
        }
    }
    //国创推荐换一换
    handleGuoNumChange = () => {
        if (this.state.guoNum < 3) {
            this.setState({
                guoNum: this.state.guoNum + 1
            })
        } else {
            this.setState({
                guoNum: 0
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

    /* 登录图片 */
    _renderLoginImg = () => {
        return (
            <View style={styles.login}>
                <Image source={require("../../assets/images/bangumi_home_login_guide.png")} style={{ width: "100%", height: 100 }}></Image>
            </View>
        )
    }

    //主题渲染
    _renderBody = () => {
        return (
            <View>
                {/* 轮播图片 */}
                <BmSwiper imgSource={swiperImages}></BmSwiper>
                {/* 导航栏  */}
                {this._renderNavbar()}
                {/* 登录图片 */}
                {this._renderLoginImg()}

                <BanItem
                    dataSource={this.state.bangumiList.slice(this.state.recommednNum * 4, (this.state.recommednNum + 1) * 4)}
                    title={"热门番剧"}
                    num={this.state.recommednNum}
                    handleChange={this.handleRecommednNumChange}
                    coverMode={0}
                ></BanItem>
                <BanItem
                    dataSource={this.state.guoChuangList.slice((this.state.guoNum + 4) * 4, (this.state.guoNum + 4 + 1) * 4)}
                    title={"国创推荐"}
                    handleChange={this.handleGuoNumChange}
                    num={this.state.funNum}
                    coverMode={0}
                ></BanItem>
                <BanItem
                    dataSource={this.state.bangumiList.slice((this.state.funNum + 4) * 4, (this.state.funNum + 4 + 1) * 4)}
                    title={"兴趣推荐"}
                    handleChange={this.handleFunNumChange}
                    num={this.state.funNum}
                    coverMode={0}
                ></BanItem>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <ScrollView
                    onScroll={this._onScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={['#fb7b9e']}
                        />}
                >
                    {this.state.show ? this._renderBody() : null}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    //登陆图片样式
    login: {
        width: "100%",
        overflow: "hidden",
        marginTop: 5,
        marginBottom: 18
    }
    //番剧推荐
})

export default Bangumi;