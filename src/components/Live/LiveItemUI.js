import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'


class LiveItemUI extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<View style={styles.box}>
            <View style={styles.imgBox}>
                {
                    this.props.pendentRu ? <ImageBackground style={styles.bgpic} resizeMode={"stretch"} source={{ uri: this.props.pendentPic }}>
                        <Text style={styles.pendentRu}>{this.props.pendentRu}</Text>
                    </ImageBackground> : null
                }
                <Image style={styles.cover} source={{ uri: this.props.cover }} />
                <View style={styles.bottomBox}>
                    <ImageBackground style={styles.info} resizeMode={'cover'} source={require('../../assets/images/jianbian.png')}>
                        <Text style={styles.uname}>{this.props.uname}</Text>
                        <Text style={styles.num}>{this.props.onlineNum}</Text>
                    </ImageBackground>
                </View>
            </View>
            <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text>
            <Text style={styles.type}>{this.props.type}</Text>
        </View >);
    }
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 140,
        marginBottom: 10
    },
    imgBox: {
        position: 'relative',
        height: '70%',
    },
    title: {
        height: '15%',
        fontSize: 14
    },
    type: {
        fontSize: 12,
        color: '#888',
        height: '15%',

    },
    cover: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    bgpic: {
        position: 'absolute',
        top: '-1%',
        left: 0,
        zIndex: 20
    },
    pendentRu: {
        fontSize: 12,
        color: '#fff',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 30,
        paddingRight: 5
    },
    info: {
        flexDirection: 'row',
        width: '100%',
        zIndex: 20,
        justifyContent: 'space-between',
        paddingTop: 2,
        paddingBottom: 2
    },
    bottomBox: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        borderRadius: 5,
    },
    uname: {
        marginLeft: 4,
        fontSize: 12,
        color: '#fff'
    },
    num: {
        marginRight: 4,
        fontSize: 12,
        color: '#fff'
    }
})

export default LiveItemUI;