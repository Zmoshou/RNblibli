import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, Image, StyleSheet, Dimensions } from 'react-native'
import { numFormat } from '../../utils/utils';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class VideoComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aid: this.props.aid,
            pn: 0,
            ps: 30,
            refreshing: true,
            CommentList: [],
        }
    }

    componentDidMount() {
        this.getCommentList();
    }

    //获取评论列表数据
    getCommentList = () => {
        let url = `https://api.bilibili.com/x/v2/reply?jsonp=jsonp&type=1&oid=${this.state.aid}&pn=${this.state.pn}&ps=${this.state.ps}`
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    // let commentArr = [...data.data.hots, ...data.data.replies];
                    // commentArr.unshift(data.data.upper.top)
                    this.setState({
                        CommentList: data.data.hots,
                        refreshing: false
                    })
                }
            })
    }

    //会员等级图标渲染
    _renderLevelIcon = (level) => {
        switch (level) {
            case 0:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20 }}>&#xe6cc;</Text>
            case 1:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#c7e1d1' }}>&#xe6cd;</Text>
            case 2:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#95ddb2' }}>&#xe6ce;</Text>
            case 3:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#92d1e5' }}>&#xe6cf;</Text>
            case 4:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#ffb37c' }}>&#xe6d0;</Text>
            case 5:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#ff6c00' }}>&#xe6d1;</Text>
            case 6:
                return <Text style={{ fontFamily: 'iconfont', fontSize: 20, color: '#ff0000' }}>&#xe6d2;</Text>
            default:
                return null
        }
    }

    //渲染每个评论元素
    _renderItem = (item) => {
        return (
            <View style={styles.ItemBox}>
                <View style={styles.coverBox}>
                    <Image style={styles.avatar}
                        defaultSource={require('../../assets/images/bili_default_avatar.png')}
                        source={{ uri: item.member.avatar }} />
                    {item.member.pendant.pid != 0 ? <Image style={styles.bgAvatar} source={{ uri: item.member.pendant.image }}
                    /> : null}
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <View style={styles.topComment}>
                        <View style={styles.userInfo}>
                            <View style={styles.infoLeft}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={item.member.vip.vipStatus == 0 ? styles.uname : styles.vipUname}>{item.member.uname}</Text>
                                    {this._renderLevelIcon(item.member.level_info.current_level)}
                                </View>
                                <Text style={styles.ctime}>{moment(item.ctime * 1000).format('YYYY-MM-DD')}</Text>
                            </View>
                            <Text style={styles.infoRight}>＋关注</Text>
                        </View>
                    </View>
                    <View style={styles.bottomReply}>
                        <View style={styles.commentBox}>
                            {
                                item.content.emote ?
                                    <Text style={styles.message}>
                                        {this._replaceEmote(item.content.emote, item.content.message)}
                                    </Text> :
                                    <Text style={styles.message}>{item.content.message}</Text>
                            }
                        </View>
                        <View style={styles.iconBox}>
                            <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#888' }}>&#xe6c7;</Text>
                            <Text style={{ fontSize: 12, color: '#888', marginLeft: 5, marginRight: 15 }}>{numFormat(item.like)}</Text>
                            <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#888', marginRight: 15 }}>&#xe6c6;</Text>
                            <Text style={{ fontFamily: 'iconfont', fontSize: 18, color: '#888' }}>&#xe6df;</Text>
                        </View>
                        {item.rcount != 0 ? <View style={styles.replyCommentBox}>
                            {item.replies.map((rpItem, idx) => {
                                return (
                                    <Text key={idx} numberOfLines={2} style={styles.replyItemBox}>
                                        <Text style={styles.repUname}>{rpItem.member.uname}</Text>
                                        <Text style={styles.repUname} >{rpItem.member.uname}</Text>
                                        {/* {rpItem.member.uname} */}
                                        :{rpItem.content.message}
                                    </Text>
                                )
                            })}
                            <Text style={styles.replyNum}>共{item.rcount}回复></Text>
                        </View> : null}
                    </View>
                </View>
            </View >
        )
    }

    //表情替换 真的麻烦
    _replaceEmote = (obj, msg) => {
        let textMessage = msg
        Object.keys(obj).forEach(key => {
            console.warn(obj[key].text);
            let rep = new RegExp(obj[key].text,'g')
            textMessage = textMessage.replace(rep, 'X')
            console.warn(textMessage);

        })
        return textMessage
        //     //-------------------------
        //     let newMsg = msg;
        //     for (const key in obj) {
        //         Image.getSize(obj[key].url, (width, height) => {
        //             let rep = <Ice(msg, obj[key], rep);
        //         })
        //     } mage source = {{ uri: obj[key].url }
        // } style = {{ width: 50, height: 50 }} />
        // doRepla

        // return newMsg;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.CommentList}
                    renderItem={({ item, index }) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => + index}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={5}
                    ItemSeparatorComponent={() => <View style={{ height: 1, transform: [{ scaleY: 0.1 }], backgroundColor: '#ccc' }}></View>}//分割线组件、
                    // ListHeaderComponent={() => {
                    //     return (<View style={styles.topItemList}>
                    //         {this._renderTopItem()}
                    //     </View>)
                    // }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            colors={['#fb7b9e']}
                        />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ItemBox: {
        padding: 8,
        flexDirection: 'row'
    },
    coverBox: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    avatar: {
        position: 'absolute',
        height: 35,
        width: 35,
        borderRadius: 50,
    },
    bgAvatar: {
        position: 'absolute',
        top: 0,
        zIndex: 5,
        height: 60,
        width: 60,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    uname: {
        marginRight: 4,
        color: '#444',
        fontSize: 12.5
    },
    vipUname: {
        marginRight: 4,
        color: '#fb7b9e',
        fontWeight: 'bold',
        fontSize: 12.5
    },
    ctime: {
        fontSize: 12,
        color: '#888'
    },
    infoRight: {
        color: '#fb7b9e',
        fontSize: 12
    },
    commentBox: {
        marginTop: 5,
    },
    message: {
        lineHeight: 22,
        fontSize: 14,
        color: '#000'
    },
    iconBox: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8
    },
    replyCommentBox: {
        padding: 5,
        backgroundColor: '#f4f4f4',
    },
    replyItemBox: {
        lineHeight: 24,
        textAlignVertical: 'center'
    },
    repUname: {
        color: '#3C57A2',
    },
    replyNum: {
        color: '#3C57A2',
        fontSize: 12
    }
})

export default VideoComment;
