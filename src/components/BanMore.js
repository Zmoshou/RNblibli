import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Dimensions, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Header,Title, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';

const BannerWidth = (Dimensions.get('window').width * 0.96);
const screenLeft = (Dimensions.get('window').width * 0.02);

const cards = [
    {
        title: "番剧推荐",
        id: 1,
        name: "猎兽神兵",
        number: "全12话",
        count: "69.1万追番",
        imageurl: "http://i0.hdslb.com/bfs/archive/81385f895a48a1c27a0e701218781908fb9d5dd2.jpg",
    },
    {
        id: 1,
        name: "鬼灭之刃",
        number: "更新至第24话",
        count: "476.9万追番",
        imageurl: "http://i0.hdslb.com/bfs/archive/efc989798673c8c374cad6e2b4fc555a8f0f3c2c.jpg",
    },
    {
        id: 1,
        name: "女高中生的虚度日常",
        number: "更新至第11话",
        count: "171.1万追番",
        imageurl: "http://i0.hdslb.com/bfs/archive/1c277223735cfe18a32f8130855a20c1a699f706.jpg",
    },
    {
        id: 1,
        name: "某科学的一方通行",
        number: "更新至第10话",
        count: "217.2万追番",
        imageurl: "http://i0.hdslb.com/bfs/archive/def29a30113e96248830b2a984c8feb6749252f4.jpg",
    },
    {
        id: 2,
        name: "爱书的下克上：为了成为图书管理员不择手段！",
        number: "更新至第10话",
        count: "36万追番",
        imageurl: "https://i2.hdslb.com/bfs/archive/b6e413bef190422a10f6c5da448b29bafc272509.jpg",
    },
    {
        id: 2,
        name: "喜欢本大爷的竟然就你一个？",
        number: "更新至第9.5话",
        count: "159.9万追番",
        imageurl: "https://i0.hdslb.com/bfs/archive/6a40cf23518888c0aa5346ba9ca659771463d2df.jpg",
    },
    {
        id: 2,
        name: "碧蓝航线",
        number: "更新至第9话",
        count: "116.8万追番",
        imageurl: "https://i1.hdslb.com/bfs/archive/ba2cb324e57b917e2bd46794540203ff76a7ba52.jpg",
    },
    {
        id: 2,
        name: "刺客守则",
        number: "全12话",
        count: "114.6万追番",
        imageurl: "https://i0.hdslb.com/bfs/archive/e7a0b9d006fe345dabd0fffe45e636a27bba7be9.jpg",
    }

];

class BanMore extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <View>
                <Header style={{ backgroundColor: "#fb7b9e",position:"relative"}}>
                    <Left style={{position:"absolute",left:10}}>
                        <Icon name="arrow-back" style={{color:"white",fontSize:22}} onPress={()=>{Actions.pop()}}></Icon>
                    </Left>
                    <Body style={{position:"absolute",left:35,top:15}}>
                        <Title style={{fontSize:16}}>更多番剧</Title>
                    </Body>
                   

                </Header>
                <FlatList
                    data={cards}
                    keyExtractor={(item, i) => i} // 解决 key 问题
                    renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
                    //ItemSeparatorComponent={this.renderSeparator} //渲染分割线的属性方法
                    onEndReachedThreshold={0.5} // 距离底部还有多远的时候，触发加载更多的事件
                    //onEndReached={this.loadNextPage} // 当距离不足 0.5 的时候，触发这个方法，加载下一页数据
                    style={{ backgroundColor: "#FFFFFF" }}
                />
            </View>
        );
    }

    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff">
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Image source={{ uri: item.imageurl }} style={{ width: 120, height: 80, marginRight: 10, borderRadius: 5 }}></Image>
                {/*justify-content:主軸的對齊 */}
                <View style={{ justifyContent: "flex-start", width: 220, height: 90 }}>
                    <Text numberOfLines={1} style={{ fontSize: 12 }}><Text>番剧名称：</Text>{item.name}</Text>
                    <Text numberOfLines={1} style={{ color: "#fb7b9e", fontSize: 10 }}><Text >番剧集数：</Text>{item.number}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 10, color: "gray" }}><Text>追番人数：</Text>{item.count}分</Text>
                    <Button transparent style={{ position: "absolute", right: 2, bottom: 0 }}>
                        <Icon name='more' style={{ color: "gray" }} />
                    </Button>
                </View>
            </View>
        </TouchableHighlight>
    }



}



export default BanMore;