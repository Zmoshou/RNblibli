import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    Dimensions,
    Button


} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const BannerWidth = Dimensions.get('window').width;
class GoodList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: 0
        }
    }
    static defaultProps = {
        list: []
    }
    render() {


        return (
            <View>
                <FlatList
                    style={{}}
                    data={this.getList()}
                    numColumns={2}
                    renderItem={({ item, i }) => this.renderItem(item)}
                    ItemSeparatorComponent={this.renderSeparator}
                // onEndReachedThreshold={0.5}
                // onEndReached={this.loadNextPage}
                />
                {/* <View>
                    <Text onPress={this.loadNextPage}>加载更多</Text></View> */}
            </View>
        );
    }

    renderItem(item) {
        return (
            <View style={{ width: "50%", padding: 2.5 }}>
               
            </View>
            // <View key={item.id} style={{ width: BannerWidth / 2 - 15, backgroundColor: "#fff", marginBottom: 9, borderWidth: 1, marginRight: 5, borderColor: "#DCDCDC", borderRadius: 5 }}>
            //     <View style={{ width: BannerWidth / 2 - 20, height: 200 }}>
            //         <Image style={{ width: "100%", height: "100%" }} source={{ uri: `http:${item.imageUrls[0]}` }}></Image>
            //     </View>
            //     <View style={{ height: 38, overflow: "hidden" }}>
            //         <Text>{item.title}</Text>
            //     </View>
            //     <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",marginBottom:10,marginTop:10}}>
            //         <Text style={{ color: "red", fontSize: 14 }}>￥{item.price[0]}</Text>
            //         <Text style={{ fontSize: 12, color: "#555", marginTop: 1 }}>{item.like}人想要</Text>
            //     </View>
            // </View>
        )
    }
    getList() {
        let arr = this.props.list.map(item => {
            if (item.tagName == "商品") {
                return item
            }
        })

        return arr
    }
    componentDidMount() {

    }

}

export default GoodList;