/*
   需要下载的额外包、库、组件
   react-native-banner-carousel
*/

import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Image,
   ImageBackground,
   FlatList,
   RefreshControl,
   Dimensions,
   TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

import { numFormat } from '../../utils/utils';
import moment from 'moment';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = Dimensions.get('window').height;

class Recommended extends Component {
   constructor(props) {
      super(props);
      this.state = {
         carouselList: [],
         recommendList: [],
         isRefreshed: false, //页面是否刷新过

         reFreshing: false, //是否在刷新过程中
      }
   }

   /* 主渲染 */
   render() {
      return (
         <View
            style={styles.recommended}
         >
            {this.renderRecommend()}
         </View>
      );
   }
   //去播放页面
   _toVideoPageOnPress(item) {
      console.warn(item.param);
      Actions.VideoPage({ 'aid': item.param })
   }

   /* 子组件 */
   // 轮播列表
   renderCarousel = () => {
      if (!this.state.isRefreshed && this.state.carouselList) {//第一次加载时出现
         return (
            <View style={{
               marginTop: 10, height: 160, borderRadius: 6, marginLeft: 5, marginRight: 5, overflow: 'hidden'
            }}>
               {this.state.carouselList.length ? <Swiper
                  dot={<View style={{ backgroundColor: '#fff', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                  activeDot={<View style={{ backgroundColor: '#fb7b9e', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                  paginationStyle={{
                     bottom: 10, left: null, right: 20
                  }}
                  autoplay={true}
                  autoplayTimeout={4}>
                  {this.state.carouselList.map((item, index) =>
                     <View key={index} style={{ height: 160 }}>
                        <Image style={{ width: '100%', height: '100%' }} resizeMode={'stretch'} source={{ uri: item.pic }} />
                     </View>
                  )}
               </Swiper> : null}
            </View >
         )
      } else {
         return null
      }
   }

   // 推荐列表
   renderRecommend = () => {
      return (
         <View
            style={styles.recommend}
         >
            <FlatList
               style={styles.recommendList}
               ListHeaderComponent={this.renderCarousel()}
               numColumns={2}
               data={this.state.recommendList}
               keyExtractor={(item, index) => (index)}
               onEndReached={this._onEndReached.bind(this)} //上拉加载方法
               onEndReachedThreshold={1.2}  //距离底部有多远的时候进行加载
               renderItem={this.renderRecommendItem}
               refreshControl={
                  <RefreshControl
                     refreshing={this.state.reFreshing}
                     onRefresh={this._onRefresh.bind(this)} //下拉刷新
                     colors={['#fb7b9e']}
                  />}
            />
         </View>
      )
   }
   // 推荐元素
   renderRecommendItem = (item, index) => {
      return (
         <TouchableHighlight
            underlayColor="#f3f3f3"
            key={index}
            onPress={() => this._toVideoPageOnPress(item.item)}
            style={styles.recommendItem}
         >
            <View
               style={styles.recommendItemInner}
            >
               <ImageBackground
                  resizeMode={'stretch'}
                  style={styles.recommendImg}
                  source={{ uri: item.item.cover }}
               >
                  <ImageBackground
                     style={styles.imgBottomBox}
                     source={require('../../assets/images/jianbian.png')}
                  >
                     <View style={styles.imgBottomItem}>
                        <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 14 }}>&#xe66d;</Text>
                        <Text style={styles.imgBottomItemText}>{numFormat(item.item.play)}</Text>
                     </View>
                     <View style={styles.imgBottomItem}>
                        <Text style={{ fontFamily: 'iconfont', color: '#fff', fontSize: 14 }}>&#xe66a;</Text>
                        <Text style={styles.imgBottomItemText}> {numFormat(item.item.danmaku)}</Text>
                     </View>
                     <View style={styles.imgBottomItem}>
                        <Text style={styles.imgBottomItemText}>{moment(item.item.duration * 1000).format('mm:ss')}</Text>
                     </View>
                  </ImageBackground>
               </ImageBackground>
               <View
                  style={styles.recommendDesc}
               >
                  <Text
                     numberOfLines={2}
                     style={styles.recommendTitle}
                  >
                     {item.item.title}
                  </Text>
                  <View
                     style={styles.recommendOtherMsg}
                  >
                     <Text
                        numberOfLines={1}
                        style={styles.recommendTags, styles.recommendTname}
                     >
                        {item.item.tname}
                     </Text>
                     {
                        ((item) => {
                           if (item.item.tag) {
                              return (
                                 <Text
                                    numberOfLines={1}
                                    style={styles.recommendTags, styles.recommendTag}
                                 >
                                    •{item.item.tag.tag_name}
                                 </Text>
                              )
                           }
                        })(item)
                     }
                  </View>
               </View>
            </View>
         </TouchableHighlight>
      )
   }

   /* 生命周期函数 */
   // UNSAFE_ComponentDidMount
   componentDidMount() {
      // 初始化页面
      this.init();
      this.setState({
         reFreshing: true
      })
   }

   /* 方法 */
   // 得到轮播图
   async getCarousel() {
      let res = await fetch('https://api.bilibili.com/x/web-show/res/loc?pf=7&id=1695')
      let resJson = await res.json()

      return resJson.data;
   }
   // 得到推荐视频
   async getRecommend() {
      let res = await fetch('https://app.bilibili.com/x/feed/index?appkey=1d8b6e7d45233436&build=508000&login_event=0&mobi_app=android')
      let resJson = await res.json()
      return resJson.data;
   }
   // 页面初始化
   async init() {
      let recommend = await this.getRecommend();
      //更新推荐视频数据
      this.setState({
         recommendList: recommend,
         reFreshing: false,
      });

      let carousel = await this.getCarousel();
      //更新轮播图
      this.setState({ carouselList: carousel });

   }
   //上拉加载
   async _onEndReached() {
      let recommend = await this.getRecommend();
      this.setState({
         recommendList: this.state.recommendList.concat(recommend)
      });
   }
   //下拉刷新
   _onRefresh() {
      this.setState({
         isRefreshed: true
      })
      this.init();
   }
}

/* css */
const styles = StyleSheet.create({
   recommended: {
      flex: 1,
      backgroundColor: '#f1f1f1'
   },
   swiperImgItem: {
      width: '100%',
      height: '100%'
   },
   recommend: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0
   },
   recommendList: {
      width: '100%',
   },
   recommendItem: {
      width: '50%',
      height: 220,
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 10
   },
   recommendItemInner: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: 5,
      overflow: 'hidden'
   },
   recommendImg: {
      flex: 6,
      position: 'relative'
   },
   imgBottomBox: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 20,
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   imgBottomItem: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   imgBottomItemText: {
      fontSize: 12,
      color: '#fff'
   },
   recommendDesc: {
      flex: 4
   },
   recommendTitle: {
      flex: 16,
      padding: 10
   },
   recommendOtherMsg: {
      flex: 9,
      flexDirection: 'row',
      padding: 10,
      paddingTop: 0
   },
   recommendTname: {
      fontSize: 12,
      color: '#999',
      maxWidth: '50%'
   },
   recommendTag: {
      fontSize: 12,
      color: '#999',
      maxWidth: '50%'
   }
})

export default Recommended;