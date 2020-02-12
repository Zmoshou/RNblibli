import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,


} from 'react-native'

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
                />
            </View>
        );
    }

    renderItem(item) {
        return (
            <View style={{width:"50%",padding:2.5,}}>
                  <View key={item.id} style={{ overflow:"hidden", backgroundColor: "#fff", marginBottom: 9, borderWidth: 1, marginRight: 5, borderColor: "#DCDCDC", borderRadius: 5 }}>
                <View style={{ height:150 }}>
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: `https:${item.imageUrls[0]}` }}></Image>
                </View>
                <View style={{height: 35, overflow: "hidden",paddingLeft: 5, paddingRight: 5, }}>
                    <Text numberOfLines={2}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",paddingLeft: 5, paddingRight: 5,marginBottom:10,marginTop:10}}>
                    <Text style={{ color: "#F06292", fontSize: 14 }}>￥{item.price[0]}</Text>
                    <Text style={{ fontSize: 12, color: "#555", marginTop: 1 }}>{item.want}</Text>
                </View>
            </View>
            </View>
        )
    }
    getList() {

         let arr=[]
      this.props.list.filter(item => {
            if (item.tagName == "展演") {
               
               arr.push(item)
            }
        })



        return arr
    }
    componentDidMount() {

    }

}

export default GoodList;