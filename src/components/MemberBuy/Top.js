import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

import { Icon, } from 'native-base';


const Top = () => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", padding: 5,paddingRight:15,paddingLeft:15,borderBottomColor: "#eee", borderBottomWidth: 0.5 }}>
            <View style={{ flex: 3 }}></View>
            <View style={{ flex: 3, alignItems: "center" }}>
                <Text>会员购</Text>
            </View>
            <View style={{ flex: 3, flexDirection: "row"}}>
                <View style={{ flex: 1,  }}>
                    <Icon type="FontAwesome" name="star" style={{ color: "#F06292", fontSize: 16, marginRight: 15 }} />
                </View>
                <View style={{ flex: 1,  }}>
                    <Icon type="FontAwesome" name="shopping-cart" style={{ color: "#F06292", fontSize: 16, marginRight: 15 }} />
                </View>
                <View style={{ flex: 1,  }}>
                    <Icon type="FontAwesome" name="user-circle-o" style={{ color: "#F06292", fontSize: 16, }} />
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Top

