
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Animated, TouchableHighlight, ImageBackground } from 'react-native';
import { numFormat } from '../../utils/utils';


class MoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doRotate: new Animated.Value(0)
        }
    }
    doChange = () => {
        this.state.doRotate.setValue(0);
        Animated.timing(                  // 随时间变化而执行动画
            this.state.doRotate,                       // 动画中的变量值
            {
                toValue: 1,                   // 透明度最终变为1，即完全不透明
                duration: 800,              // 让动画持续一段时间
            }
        ).start();
    }

    render() {
        return (
            <View style={styles.bangumiBox}>
                <View style={styles.headBox}>
                    <Text style={styles.headBoxLeft}>{this.props.title}</Text>
                    <View style={styles.headBoxRight} >
                        <Text style={styles.rightText}>查看更多</Text>
                        <Text style={{ fontFamily: 'iconfont', fontSize: 12, color: '#888' }}>&#xe693;</Text>
                    </View>
                </View >
                <View style={styles.mainBox}>
                    {this.props.dataSource.map((item, index) => {
                        return (
                            <View key={index} style={styles.mainBoxItem}>
                                <ImageBackground style={styles.topImg} source={{ uri: item.cover }}>
                                    <View style={styles.favIcon}>
                                        <Text style={{ fontFamily: 'iconfont', fontSize: 24, color: '#fff' }}>&#xe66b;</Text>
                                        {/* <Text style={{ fontFamily: 'iconfont', fontSize: 24, color: '#fb7b9e' }}>&#xe6db;</Text> */}
                                    </View>
                                    {item.badge ? <Text style={styles.badge}>{item.badge}</Text> : null}
                                    <ImageBackground style={styles.jianbian} source={require('../../assets/images/jianbian.png')}>
                                        <Text style={styles.followNum}>{numFormat(item.stat.follow)}系列追番</Text>
                                    </ImageBackground>
                                </ImageBackground>
                                <View style={styles.mainBoxItemInfo}>
                                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.indexShow}>{item.new_ep.index_show}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <TouchableHighlight
                    style={styles.doChange}
                    onPress={() => { this.doChange(), this.props.handleChange() }}
                    underlayColor="#f3f3f3">
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Animated.Text style={{
                            fontFamily: 'iconfont',
                            color: '#fb7b9e',
                            fontSize: 16,
                            transform: [{
                                rotate: this.state.doRotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'] //线性插值，0对应0deg  1对应360deg 
                                })
                            }]
                        }}>&#xe67f;</Animated.Text>
                        <Text style={{ marginLeft: 5, fontSize: 12, color: '#888' }}>换一换</Text>
                    </View>
                </TouchableHighlight>
            </View >)
    }
}
const styles = StyleSheet.create({
    bangumiBox: {
        // paddingTop: 15,
        borderTopColor: '#ccc',
        borderTopWidth: 0.2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headBox: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headBoxLeft: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    headBoxRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightText: {
        fontSize: 12,
        color: '#888'
    },
    mainBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    mainBoxItem: {
        width: '30%',
        marginBottom: 10
        // height: 200,
    },
    topImg: {
        position: 'relative',
        overflow: 'hidden',
        // flex: 7.5,
        height:150,
        borderRadius: 4
    },
    mainBoxItemInfo: {
        // flex: 2.5,
    },
    favIcon: {
        height: 30,
        width: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badge: {
        position: 'absolute',
        right: 2,
        top: 2,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: '#fb7b9e',
        borderRadius: 4,
        color: '#fff',
        fontSize: 12
    },
    jianbian: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 20,
        width: '100%'
    },
    followNum: {
        marginLeft: 5,
        fontSize: 12,
        color: '#fff'
    },
    title: {
        fontSize: 14,
        marginTop: 2,
        marginBottom: 2
    },
    indexShow: {
        fontSize: 12,
        color: '#888'
    },
    doChange: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default MoveItem;

