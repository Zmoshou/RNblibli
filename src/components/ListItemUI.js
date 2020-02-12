import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { numFormat } from '../utils/utils';

class ListItemUI extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={styles.hotItem}>
                <View style={styles.hotItemLeft}>
                    <Image style={styles.itemImage}
                        source={{ uri: this.props.cover }} />
                    <Text style={styles.time}>{this.props.time}</Text>
                </View>
                <View style={styles.hotItemRight}>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.itemTitle}>{this.props.title}</Text>
                    <View>
                        <View style={styles.lineBox}>
                            <Text style={{ fontFamily: 'iconfont', color: '#888', }}>&#xe66e;</Text>
                            <Text style={styles.desc}>{this.props.upname}</Text>
                        </View>
                        <View style={styles.lineBox}>
                            <Text style={{ fontFamily: 'iconfont', color: '#888', }}>&#xe66d;</Text>
                            <Text style={styles.desc}>{numFormat(this.props.playNum)}</Text>
                            <Text style={{ fontFamily: 'iconfont', color: '#888', }}>&#xe66a;</Text>
                            <Text style={styles.desc}>{this.props.danmaku}</Text>
                        </View>
                        {this.props.tags ?
                            <View style={styles.lineBox}>
                                <Text style={styles.rcmdReasonTextA}>{this.props.tags}</Text>
                            </View>
                            : null
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        marginLeft: 5,
        marginRight: 5,
        fontSize: 12,
        color: '#888',
    },
    rcmdReasonTextA: {
        marginTop: 2,
        paddingLeft: 2,
        paddingRight: 2,
        borderWidth: 1,
        borderRadius: 2,
        fontSize: 10,
        backgroundColor: '#f5992a',
        borderColor: '#f5992a',
        color: '#fff'
    },
    // rcmdReasonTextB: {
    //     paddingLeft: 2,
    //     paddingRight: 2,
    //     borderWidth: 1,
    //     borderRadius: 2,
    //     fontSize: 10,
    //     bottom: 0,
    //     left: 0,
    //     position: 'absolute',
    //     borderColor: '#fdd849',
    //     color: '#fdd849'
    // },
    lineBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ListItemUI;