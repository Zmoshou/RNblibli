import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Actions } from 'react-native-router-flux';
import { numFormat } from '../../utils/utils';


import ListItemUI from '../../components/ListItemUI';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValueA: '默认排序',
            selectValueB: '全部时长',
            selectValueC: '全部分区',
            dropdownList: ['默认排序', '播放多', '新发布', '弹幕多'],
            dropdownList2: ['全部时长', '0-10分钟', '10-30分钟', '30-60分钟'],
            dropdownList3: ['全部分区', '分区2', '分区3', '分区4']
        }
    }

    componentDidMount() {
        // this.getSearchResultList()
    }

    //列表元素按下事件
    _toVideoPageOnPress(item) {
        Actions.VideoPage({ 'aid': item.param })
    }

    //上拉加载
    _onEndReached = () => {
        this.props.resultClssfiy(1)
    }


    _renderResultList = (item, index) => {
        if (item.linktype === 'video') {
            return (
                <TouchableHighlight
                    onPress={() => this._toVideoPageOnPress(item)}
                    underlayColor="#f3f3f3"
                >
                    <ListItemUI
                        cover={'https:' + item.cover}
                        title={item.title}
                        upname={item.author}
                        playNum={item.play}
                        danmaku={numFormat(item.danmaku)}
                        time={item.duration}
                        tags={item.rec_tags ? item.rec_tags : null}
                    ></ListItemUI>
                </TouchableHighlight>
            )
        } else {
            return null
        }
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.topBox}>
                <ModalDropdown 
                defaultIndex={0} 
                defaultValue={this.state.selectValueA} 
                options={this.state.dropdownList} 
                dropdownTextStyle={styles.dropdownTextStyle} 
                dropdownTextHighlightStyle={styles.highlightStyle} 
                style={styles.dropdown} 
                textStyle={styles.dropdownText} 
                dropdownStyle={styles.dropdownStyle} 
                // onSelect={(index)=>{console.warn(index)}}
                />
                <ModalDropdown defaultIndex={0} defaultValue={this.state.selectValueB} options={this.state.dropdownList2} dropdownTextStyle={styles.dropdownTextStyle} dropdownTextHighlightStyle={styles.highlightStyle} style={styles.dropdown} textStyle={styles.dropdownText} dropdownStyle={styles.dropdownStyle} />
                <ModalDropdown defaultIndex={0} defaultValue={this.state.selectValueC} options={this.state.dropdownList3} dropdownTextStyle={styles.dropdownTextStyle} dropdownTextHighlightStyle={styles.highlightStyle} style={styles.dropdown} textStyle={styles.dropdownText} dropdownStyle={styles.dropdownStyle} />
            </View>
            <FlatList
                // data={this.state.searchResultList}
                data={this.props.result}
                renderItem={({ item, index }) => this._renderResultList(item, index)}
                keyExtractor={(item, index) => index + item.position}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={2}
            />
        </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBox: {
        flexDirection: 'row',
        height: 35,
    },
    dropdown: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderColor: '#fb7b9e'
    },
    dropdownText: {
        color: '#888',
        fontSize: 14,
        width: 80,
        textAlign: 'center',
        color: '#fb7b9e'
    },
    dropdownStyle: {
        backgroundColor: '#ccc',
        marginTop: 10,
        width: 80,
        height: 158,
        justifyContent: 'center'
    },
    highlightStyle: {
        backgroundColor: '#fb7b9e',
        fontSize: 14,
        textAlign: 'center',
        color: '#fff'
    },
    dropdownTextStyle: {
        backgroundColor: '#fff',
        color: '#fb7b9e',
        fontSize: 14,
        textAlign: 'center'
    },
})

export default SearchResult;