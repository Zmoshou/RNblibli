import React, { Component } from 'react';
import Video from 'react-native-video';

import { View, Text, StyleSheet, StatusBar, Slider, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullScreenFlag: false, //是否全屏标志
            loading: false,//loading显示,
            boxShow: false, //控制上下按钮盒子的显示和隐藏
            rate: 1, //播放速度
            // volume: 1, //声音比例
            // muted: false,//是否静音
            resizeMode: 'contain', //cover ,stretch,contain
            duration: 0.0,
            currentTime: 0.0,
            paused: false,
            sliderValue: 0, //滑块进度
            sliderFlag: true, //协调滑块和手势滑动冲突的节流阀
        };
    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={this._showControl}>
                <View style={styles.container}>
                    {
                        this.state.boxShow ?
                            <View style={styles.topBox}>
                                <Text onPress={this.props.back} style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 18 }}>&#xe692;</Text>
                                <View style={styles.topBoxRight}>
                                    <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 24, marginRight: 12 }}>&#xe69d;</Text>
                                    <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 22 }}>&#xe68a;</Text>
                                </View>
                            </View>
                            : null
                    }
                    <Video
                        style={styles.videoStyle}
                        source={{ uri: this.props.url }}
                        ref={(ref) => {
                            this.video = ref
                        }}
                        resizeMode={this.state.resizeMode}//缩放模式
                        rate={this.state.rate}//播放速率
                        playInBackground={false}// 当app转到后台运行的时候，播放是否暂停
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad} //加载媒体并准备播放时调用的回调函数。
                        onProgress={this._onProgress}
                        paused={this.state.paused}//暂停
                        onEnd={this._onEnd}
                        onBuffer={(data) => { this._onBuffer(data) }} //视频缓冲
                    // onEnd={this.onEnd}//视频播放结束时的回调函数
                    />
                    {this.state.paused ?
                        <Text onPress={this._setPausedOnPress} style={styles.videoPausedIcon}>&#xe6b0;</Text> : null
                    }
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={styles.loading}
                        size="large"
                        color="#fb7b9e"
                    />
                    {
                        this.state.boxShow ?
                            <View style={styles.bottonBox}>
                                <View style={styles.leftBox}>
                                    {
                                        this.state.paused ?
                                            <Text onPress={this._setPausedOnPress} style={{ fontFamily: 'iconfont', fontSize: 34, color: '#fff' }}>&#xe6aa;</Text> :
                                            <Text onPress={this._setPausedOnPress} style={{ fontFamily: 'iconfont', fontSize: 34, color: '#fff' }}>&#xe6ab;</Text>
                                    }
                                </View>
                                <Slider style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor={'#fb7b9e'}
                                    thumbTintColor={'#fb7b9e'}
                                    maximumTrackTintColor={'rgba(255,255,255,0.6)'}
                                    onValueChange={this._onValueChange}
                                    onSlidingComplete={this._onSlidingComplete} //户结束滑动的时候调用此回调
                                    value={this.state.sliderValue} //滑块的初始值。这个值应该在最小值和最大值之间。默认值是0。
                                ></Slider>
                                <View style={styles.rightBox}>
                                    <Text style={styles.duration}>
                                        {moment(this.state.currentTime * 1000).format('mm:ss')}/
                                        {moment(this.state.duration * 1000).format('mm:ss')}
                                    </Text>
                                    {
                                        this.state.fullScreenFlag ? <Text onPress={this.props.setfullScreen} style={{ fontFamily: 'iconfont', color: '#fb7b9e', fontSize: 24 }}>&#xe6c3;</Text>
                                            : <Text onPress={this.props.setfullScreen} style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 22 }}>&#xe6c3;</Text>
                                    }
                                </View>
                            </View>
                            : null
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
    //显示上下控制栏
    _showControl = () => {
        if (!this.state.loading) {
            this.setState({
                boxShow: !this.state.boxShow
            })
        }
    }
    //视频播放完毕后
    _onEnd = () => {
        this.setState({
            paused: true,
            // sliderValue: 0
        })
        this.video.seek(0)
    }
    //
    _onBuffer = (data) => {
    }

    //视频加载成功后调用
    _onLoad = (data) => {
        this.setState({
            duration: Math.ceil(data.duration),
            loading: false,
            boxShow: true
        })
    }
    //视频开始加载时
    _onLoadStart = (data) => {
        this.setState({
            loading: true
        })
    }

    //设置播放暂停
    _setPausedOnPress = () => {
        this.setState({
            paused: !this.state.paused
        })
    }

    //视频播放中调用
    _onProgress = (data) => {
        if (this.state.sliderFlag) {
            let value = ((Math.ceil(data.currentTime) / this.state.duration) * 100)
            this.setState({
                sliderValue: value,
                currentTime: Math.ceil(data.currentTime)
            })
        }
    }
    //滑动滑块时触发
    _onValueChange = (length) => {
        let current = this.state.duration * (length / 100)
        this.setState({
            sliderFlag: false,
            currentTime: Math.ceil(current)
        })
    }
    //手指从滑块离开时触发
    _onSlidingComplete = (length) => {
        var timer = null;
        this.video.seek(this.state.currentTime)
        // 解决一个进度条来回跳动的bug 为什么这样写 我也不太清楚！！！
        timer = setTimeout(() => {
            this.setState({
                sliderFlag: true,
            })
        }, 250)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        position: 'relative'
    },
    videoStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    topBox: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: "15%",
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingLeft: 8,
        paddingRight: 8,
        zIndex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topBoxRight: {
        flexDirection: 'row',
        marginRight: 8
    },
    videoPausedIcon: {
        fontFamily: 'iconfont',
        color: 'rgba(255,255,255,0.7)',
        fontSize: 40,
        position: 'absolute',
        right: '10%',
        bottom: '20%'
    },
    loading: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
    },
    bottonBox: {
        position: 'absolute',
        height: "15%",
        left: 0,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    leftBox: {
        paddingLeft: 5
    },
    slider: {
        // width: '60%',
        flex: 1
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15
    },
    duration: {
        fontSize: 12,
        color: '#fff',
        marginRight: 8,
    }
})


export default VideoPlayer;

// import React, { Component } from 'react'
// import { View, Text, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform, Dimensions, StyleSheet } from 'react-native'
// import Video from 'react-native-video'
// import Orientation from 'react-native-orientation'
// import { commonStyle } from './commonStyle'
// import { Icon } from './icon'

// const deviceInfo = {
//     deviceWidth: Dimensions.get('window').width,
//     deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24
// }

// const header = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
// }

// const movieDetailUrl = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=125805'

// const playerHeight = 250

// export default class MoviePlayer extends Component {

//     constructor(props) {
//         super(props)
//         this.player = null
//         this.state = {
//             rate: 1,
//             slideValue: 0.00,
//             currentTime: 0.00,
//             duration: 0.00,
//             paused: false,
//             playIcon: 'music_paused_o',
//             isTouchedScreen: true,
//             modalVisible: true,
//             isLock: false,
//             movieInfo: {},
//             orientation: null,
//             specificOrientation: null
//         }
//     }

//     componentWillMount() {
//         const init = Orientation.getInitialOrientation()
//         this.setState({
//             init,
//             orientation: init,
//             specificOrientation: init,
//         })
//     }

//     componentDidMount() {

//         fetch(movieDetailUrl, {
//             method: 'GET',
//             headers: header
//         })
//             .then((response) => response.json())
//             .then((responseData) => {
//                 this.setState({ movieInfo: responseData.data.basic.video })
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//             .done()

//         Orientation.addOrientationListener(this._updateOrientation)
//         Orientation.addSpecificOrientationListener(this._updateSpecificOrientation)
//     }

//     componentWillUnmount() {
//         Orientation.removeOrientationListener(this._updateOrientation)
//         Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation)
//     }

//     _updateOrientation = orientation => this.setState({ orientation })
//     _updateSpecificOrientation = specificOrientation => this.setState({ specificOrientation })

//     loadStart(data) {
//         console.log('loadStart', data)
//     }

//     setDuration(duration) {
//         this.setState({ duration: duration.duration })
//     }

//     setTime(data) {
//         let sliderValue = parseInt(this.state.currentTime)
//         this.setState({
//             slideValue: sliderValue,
//             currentTime: data.currentTime,
//             modalVisible: false
//         })
//     }

//     onEnd(data) {
//         this.player.seek(0)
//     }

//     videoError(error) {
//         this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
//         this.setState({
//             modalVisible: false
//         })
//     }

//     onBuffer(data) {
//         console.log('onBuffer', data)
//     }

//     onTimedMetadata(data) {
//         console.log('onTimedMetadata', data)
//     }

//     showMessageBar = title => msg => type => {
//         // 消息
//     }

//     formatMediaTime(duration) {
//         let min = Math.floor(duration / 60)
//         let second = duration - min * 60
//         min = min >= 10 ? min : '0' + min
//         second = second >= 10 ? second : '0' + second
//         return min + ':' + second
//     }

//     play() {
//         this.setState({
//             paused: !this.state.paused,
//             playIcon: this.state.paused ? 'music_paused_o' : 'music_playing_s'
//         })
//     }

//     renderModal() {
//         return (
//             <Modal
//                 animationType={"none"}
//                 transparent={true}
//                 visible={this.state.modalVisible}
//                 onRequestClose={() => alert("Modal has been closed.")}
//             >
//                 <View style={styles.indicator}>
//                     <ActivityIndicator
//                         animating={true}
//                         style={[{ height: 80 }]}
//                         color={commonStyle.red}
//                         size="large"
//                     />
//                 </View>
//             </Modal>
//         )
//     }

//     render() {
//         const { orientation, isLock } = this.state
//         const url = this.state.movieInfo.url
//         const title = this.state.movieInfo.title
//         return (
//             url ? <TouchableOpacity
//                 style={[styles.movieContainer, {
//                     height: orientation === 'PORTRAIT' ? playerHeight : deviceInfo.deviceWidth,
//                     marginTop: orientation === 'PORTRAIT' ? Platform.OS === 'ios' ? 20 : 0 : 0
//                 }]}
//                 onPress={() => this.setState({ isTouchedScreen: !this.state.isTouchedScreen })}>
//                 <Video source={{ uri: url }}
//                     ref={ref => this.player = ref}
//                     rate={this.state.rate}
//                     volume={1.0}
//                     muted={false}
//                     paused={this.state.paused}
//                     resizeMode="cover"
//                     repeat={true}
//                     playInBackground={false}
//                     playWhenInactive={false}
//                     ignoreSilentSwitch={"ignore"}
//                     progressUpdateInterval={250.0}
//                     onLoadStart={(data) => this.loadStart(data)}
//                     onLoad={data => this.setDuration(data)}
//                     onProgress={(data) => this.setTime(data)}
//                     onEnd={(data) => this.onEnd(data)}
//                     onError={(data) => this.videoError(data)}
//                     onBuffer={(data) => this.onBuffer(data)}
//                     onTimedMetadata={(data) => this.onTimedMetadata(data)}
//                     style={[styles.videoPlayer]}
//                 />
//                 {
//                     !isLock ?
//                         <View style={styles.navContentStyle}>
//                             <View style={{ flexDirection: 'row', alignItems: commonStyle.center, flex: 1 }}>
//                                 <TouchableOpacity
//                                     style={{ backgroundColor: commonStyle.clear }}
//                                     onPress={orientation === 'PORTRAIT' ? () => alert('pop') : Orientation.lockToPortrait}>
//                                     <Icon name={'oneIcon|nav_back_o'} size={18} color={commonStyle.white} />
//                                 </TouchableOpacity>
//                                 <Text style={{ backgroundColor: commonStyle.clear, color: commonStyle.white, marginLeft: 10 }}>{title}</Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: commonStyle.center, justifyContent: commonStyle.between }}>
//                                 <TouchableOpacity
//                                     style={styles.navToolBar}
//                                     onPress={() => alert('切换电视！')}>
//                                     <Icon name={'oneIcon|tv_o'} size={20} color={commonStyle.white} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     style={styles.navToolBar}
//                                     onPress={() => alert('开启VR！')}>
//                                     <Icon name={'oneIcon|video_o'} size={20} color={commonStyle.white} />
//                                 </TouchableOpacity>
//                                 {
//                                     orientation !== 'PORTRAIT' ?
//                                         <View style={{ flexDirection: commonStyle.row, alignItems: commonStyle.center }}>
//                                             <TouchableOpacity
//                                                 style={[styles.navToolBar, { borderColor: commonStyle.white, borderWidth: 0.5, padding: 3 }]}
//                                                 onPress={() => alert('开启弹幕！')}>
//                                                 <Text style={{ color: commonStyle.white, fontSize: 12 }}>弹</Text>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 style={styles.navToolBar}
//                                                 onPress={() => alert('分享！')}>
//                                                 <Icon name={'oneIcon|share_dot_o'} size={20} color={commonStyle.white} />
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 style={styles.navToolBar}
//                                                 onPress={() => alert('下载！')}>
//                                                 <Icon name={'oneIcon|download_o'} size={20} color={commonStyle.white} />
//                                             </TouchableOpacity>
//                                             <TouchableOpacity
//                                                 style={styles.navToolBar}
//                                                 onPress={() => alert('设置画面！')}>
//                                                 <Icon name={'oneIcon|more_v_o'} size={20} color={commonStyle.white} />
//                                             </TouchableOpacity>
//                                         </View> : null
//                                 }
//                             </View>
//                         </View> : <View style={{ height: commonStyle.navContentHeight, backgroundColor: commonStyle.black }} />
//                 }
//                 {
//                     orientation !== 'PORTRAIT' ?
//                         <TouchableOpacity
//                             style={{ marginHorizontal: 10, backgroundColor: commonStyle.clear, width: 30, height: 30, alignItems: commonStyle.center, justifyContent: commonStyle.center }}
//                             onPress={() => this.setState({ isLock: !this.state.isLock })}
//                         >
//                             <Icon name={`oneIcon|${this.state.isLock ? 'locked_o' : 'unlocked_o'}`} size={20} color={commonStyle.white} style={{ backgroundColor: commonStyle.blue }} />
//                         </TouchableOpacity> : null
//                 }
//                 {
//                     this.state.isTouchedScreen && !isLock ?
//                         <View style={[styles.toolBarStyle, { marginBottom: Platform.OS === 'ios' ? 0 : orientation !== 'PORTRAIT' ? 25 : 0 }]}>
//                             <TouchableOpacity onPress={() => this.play()}>
//                                 <Icon name={`oneIcon|${this.state.playIcon}`} size={18} color={commonStyle.white} />
//                             </TouchableOpacity>
//                             <View style={styles.progressStyle}>
//                                 <Text style={styles.timeStyle}>{this.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
//                                 <Slider
//                                     style={styles.slider}
//                                     value={this.state.slideValue}
//                                     maximumValue={this.state.duration}
//                                     minimumTrackTintColor={commonStyle.themeColor}
//                                     maximumTrackTintColor={commonStyle.iconGray}
//                                     step={1}
//                                     onValueChange={value => this.setState({ currentTime: value })}
//                                     onSlidingComplete={value => this.player.seek(value)}
//                                 />
//                                 <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 35 }}>
//                                     <Text style={{ color: commonStyle.white, fontSize: 12 }}>{this.formatMediaTime(Math.floor(this.state.duration))}</Text>
//                                 </View>
//                             </View>
//                             {
//                                 orientation === 'PORTRAIT' ?
//                                     <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
//                                         <Icon name={'oneIcon|scale_o'} size={18} color={commonStyle.white} />
//                                     </TouchableOpacity> :
//                                     <TouchableOpacity onPress={Orientation.lockToPortrait}>
//                                         <Icon name={'oneIcon|shrink_o'} size={18} color={commonStyle.white} />
//                                     </TouchableOpacity>
//                             }
//                         </View> : <View style={{ height: 40 }} />
//                 }
//                 {this.renderModal()}
//             </TouchableOpacity> : <View />
//         )
//     }
// }

// const styles = StyleSheet.create({
//     movieContainer: {
//         justifyContent: 'space-between'
//     },
//     videoPlayer: {
//         position: 'absolute',
//         top: 44,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
//     navContentStyle: {
//         height: 44,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 10,
//         backgroundColor: commonStyle.black
//     },
//     toolBarStyle: {
//         backgroundColor: commonStyle.black,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         justifyContent: 'space-around',
//         marginTop: 10,
//         height: 30
//     },
//     timeStyle: {
//         width: 35,
//         color: commonStyle.white,
//         fontSize: 12
//     },
//     slider: {
//         flex: 1,
//         marginHorizontal: 5,
//         height: 20
//     },
//     progressStyle: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         marginHorizontal: 10
//     },
//     indicator: {
//         height: playerHeight,
//         width: deviceInfo.deviceWidth,
//         marginTop: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     navToolBar: {
//         backgroundColor: commonStyle.clear,
//         marginHorizontal: 5
//     }
// })