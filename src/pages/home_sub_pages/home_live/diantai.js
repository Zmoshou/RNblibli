import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Video from 'react-native-video'

import Interact from './Interact';
import AnchorInfo from './AnchorInfo';

class Diantai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playUrl: '',
            resizeMode: 'contain', //cover ,stretch,contain
        }
    }
    componentDidMount() {
        this.getLivePlayUrl();
    }

    //获取播放数据
    getLivePlayUrl = () => {
        console.log(this.props.roomId);
        fetch(`https://api.live.bilibili.com/room/v1/Room/playUrl?build=5470400&device=android&cid=${this.props.roomId}`)
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    this.setState({
                        playUrl: data.data.durl[2].url,
                    })
                }
            })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', height: 200, backgroundColor: '#000', position: 'relative' }}>
                    <Video
                        style={{
                            position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%'
                        }}
                        source={{ uri: this.state.playUrl }}
                        ref={(ref) => {
                            this.video = ref
                        }}
                        resizeMode={this.state.resizeMode}
                        autoplay={true}
                    />
                </View>
               
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar
                        style={{ height: 38, borderWidth: 0.5 }}
                        tabStyle={{ height: 38, paddingLeft: 5, paddingRight: 5 }}
                    />}
                    tabBarUnderlineStyle={{ backgroundColor: '#fb7b9e', height: 2, borderRadius: 4 }}
                    tabBarTextStyle={{ fontSize: 14 }}
                    tabBarActiveTextColor='#fb7b9e'
                    tabBarInactiveTextColor='#888'
                >
                    <AnchorInfo roomId={this.props.roomId} tabLabel="互动"></AnchorInfo>
                    <Interact roomId={this.props.roomId} tabLabel="主播"></Interact>
                </ScrollableTabView>
            </View >
        )
    }
}

export default Diantai;