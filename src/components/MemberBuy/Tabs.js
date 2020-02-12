import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    // Carousel,
    Dimensions
} from 'react-native'



const Tabs = (props) => {
    return (

        <View style={{ backgroundColor: "#fff", flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#ccc", height: 30, paddingTop: 5 }}>
            <View style={{ width: "50%", alignItems: "center" }}>
                <Text onPress={props.tabs.changePage0} >商品</Text>
                <Text style={[!props.tabs.tabChange ? { backgroundColor: "#F06292", height: 4.5, width: 35 } : {}, {}]}></Text>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
                <Text onPress={props.tabs.changePage1}>推荐</Text>
                <Text style={props.tabs.tabChange ? { backgroundColor: "#F06292", height: 4.5, width: 35 } : {}}></Text>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({


})
export default Tabs