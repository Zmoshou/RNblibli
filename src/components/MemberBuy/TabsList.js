import React, { Component } from 'react';
import GoodList from '../../components/MemberBuy/GoodList';
import UnGoodList from '../../components/MemberBuy/UnGoodList';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text
} from 'react-native'
import { Container, Item, Input, Header, Tab, Tabs, ScrollableTab, Icon, } from 'native-base';
const BannerWidth = Dimensions.get('window').width;

const TabsList = (props) => {
    return (
        <View style={{width:'100%'}} >
        {/* {this.state.isShow ? this._renderView : null} */}
        <Tabs
           
            locked={false}
            tabBarPosition="bottom"
            page={props.list.page}
            tabBarBackgroundColor="#fff"
            onChangeTab={() => props.list.tabChange()}
            tabBarUnderlineStyle={{ backgroundColor: "red", width: 10, marginLeft: "7.5%" }}
            renderTabBar={() => <ScrollableTab style={{ height: 0,width:BannerWidth,backgroundColor:"green"}} />}>
            <Tab tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: "#555" }} activeTextStyle={{ color: "black" }} heading="商品">
                <GoodList list={props.list.goodList} />
         

            </Tab>
            <Tab tabStyle={{ backgroundColor: '#fff' }} activeTabStyle={{ backgroundColor: '#fff' }} textStyle={{ color: "#555" }} activeTextStyle={{ color: "black" }} heading="展演">
                <UnGoodList list={props.list.playList} />
               
            </Tab>
        </Tabs>
    </View >
    )
}
const styles = StyleSheet.create({

})
export default TabsList