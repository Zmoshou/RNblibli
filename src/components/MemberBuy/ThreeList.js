import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native'

const ThreeList = (props) => {
    return (
        <View style={styles.unknown} >
        <View style={styles.unknownOptions}>
            <Image style={{ width: 115, height: 51 }} source={{ uri: `http://i0.hdslb.com/bfs/mall/mall/38/b9/38b9561e3d75bdf284d8dd162023a058.png` }}  ></Image>
        </View>
        <View style={styles.unknownOptions}>
            <Image style={{ width: 115, height: 51 }} source={{ uri: `http://i0.hdslb.com/bfs/mall/mall/03/d1/03d10b13dfe56cb04f870bcdcb58c210.png` }}  ></Image>
        </View>
        <View style={styles.unknownOptions}>
            <Image style={{ width: 115, height: 51 }} source={{ uri: `http://i0.hdslb.com/bfs/mall/mall/a4/c3/a4c3cb96fa0e1953181c82d6b5e81e5f.png` }}  ></Image>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    unknown: {
        flexDirection: "row",
    },
    unknownOptions: {
        flex: 1,
        marginRight: 10,
        width: 100,
        // alignItems: 'center',
        // overflow: "hidden",
        // borderWidth:1,
        borderRadius: 5,
        marginTop: 10

    },
    unknownThree: {
        marginRight: 0
    },
    unknownOptionsOne: {

    },
    unknownOptionsTwo: {
        fontSize: 10
    },
    unknownOptionsThree: {
        position: "absolute",
        right: 10,
        bottom: 6,
        fontSize: 20
    }

})
export default ThreeList