
/**
 * 2019-12-15
 * 本业改成搜索页面
 * 朱继王超 
 */
import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import SearchResult from './search_sub_pages/SearchResult';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResultList: [],
            page: 1,
            onloadFlag: true,
            order: '',
            //---------------
            hotSearchList: [],
            suggestWordsList: {}, //这个玩意接收的返回的结果是个对象
            inputValue: '',
            focusFlag: false, //搜索框是否获取焦点
            searchResultFlag: false,
        }
    }

    componentDidMount() {
        this.getHotSearchList()
    }
    //获取热搜列表
    getHotSearchList = () => {
        fetch('https://app.bilibili.com/x/v2/search/hot?build=5370000&limit=10 ')
            .then(res => res.json())
            .then(data => {
                if (data.code === 0) {
                    // console.warn(data.data);
                    this.setState({
                        hotSearchList: data.data.list
                    })
                }
            })
    }
    //获取推荐搜索词
    getSuggestWordsList = () => {
        if (this.state.inputValue.trim()) {
            fetch('http://api.bilibili.cn/suggest?term=' + this.state.inputValue)
                .then(res => res.json())
                .then(data => {
                    // console.warn(data);
                    this.setState({
                        suggestWordsList: data
                    })
                })
        }
    }

    //order排序方式说明：
    //default：综合排序 
    //pubdate：按发布日期倒序排序
    //senddate：按修改日期倒序排序
    //danmaku：按弹幕数从高至低排序
    //click：按点击从高至低排序
    getSearchResultList = () => {
        fetch(`https://app.bilibili.com/x/v2/search?appkey=1d8b6e7d45233436&build=5370000&pn=${this.state.page}&ps=15&keyword=${this.state.inputValue}&order=${this.state.order}`)
            .then(res => res.json())
            .then(data => {
                // console.warn(data.data.item);
                if (data.code === 0) {
                    this.setState({
                        searchResultList: [...this.state.searchResultList, ...data.data.item],
                        page: this.state.page + 1,
                        onloadFlag: true
                    })
                }
            })
    }

    _searchResultClssfiy = (mode, order) => {
        if (mode === 0 && this.state.onloadFlag) {
            this.setState(() => {
                return {
                    searchResultList: [],
                    onloadFlag: false,
                    page: 1,
                    order: order
                }
            }, () => { this.getSearchResultList })
        } else if (mode === 1) {
            if (this.state.page > 1) {
                this.setState(() => {
                    return {
                        onloadFlag: false,
                    }
                }, this.getSearchResultList)
            }
        }
    }

    _renderResultbyHotWord = (value) => {
        this.setState(() => {
            return {
                page: 1,
                onloadFlag: false,
                searchResultFlag: true,
                inputValue: value,
                order: '',
                searchResultList: []
            }
        }, this.getSearchResultList)
        this.refs.textInput.blur();
    }

    _renderSearchResult = () => {
        if (this.state.inputValue.trim()) {
            this.setState(() => {
                return {
                    page: 1,
                    onloadFlag: false,
                    order: '',
                    searchResultFlag: true,
                    searchResultList: []
                }
            }, this.getSearchResultList)
            this.refs.textInput.blur();
        }
    }



    //推荐框输入值时自动提示
    _inputValueChange = (text) => {
        this.setState(() => {
            return {
                inputValue: text,
            }
        }, this.getSuggestWordsList)
    }

    _clearInput = () => {
        this.setState({
            inputValue: '',
            searchResultFlag: false
        })
    }

    _onFocus = () => {
        this.getSuggestWordsList();
        this.setState({ focusFlag: true })
    }

    //渲染搜索框
    _renderSearch = () => {
        return (
            <View style={styles.searchBox}>
                <View style={styles.search}>
                    <Text style={{ fontFamily: 'iconfont', color: '#fb7b9e' }}>&#xe669;</Text>
                    <TextInput
                        style={styles.seachInput}
                        placeholder={'搜点什么吧...'}
                        onChangeText={(text) => this._inputValueChange(text)}
                        value={this.state.inputValue}
                        maxLength={20}
                        onFocus={this._onFocus}
                        onBlur={() => this.setState({ focusFlag: false })}
                        ref="textInput"
                    />
                    {this.state.inputValue ? <Text onPress={this._clearInput} style={{ fontFamily: 'iconfont', color: '#fb7b9e' }}>&#xe683;</Text> : null}
                </View>
                <Text style={styles.seachText} onPress={this._renderSearchResult}>搜索</Text>
            </View>
        )
    }

    //渲染热搜和搜索历史
    _renderHotSearch = () => {
        return (
            <ScrollView>
                <View style={styles.HotSearchBox}>
                    <Text style={styles.title}>热搜</Text>
                    <View style={styles.hotWordsBox}>
                        {
                            this.state.hotSearchList.map((item, index) => {
                                return (
                                    <View key={index} style={styles.WordItem}>
                                        <Text style={item.module_id > 4 ? styles.wordNum1 : styles.wordNum2}>{item.module_id}</Text>
                                        <Text onPress={() => { this._renderResultbyHotWord(item.keyword) }}>{item.keyword}</Text>
                                        {item.icon ? <Image style={{ width: 15, height: 15, marginLeft: 5 }} source={{ uri: item.icon }} /> : null}
                                    </View>
                                )
                            })
                        }
                    </View>
                </View >
                <View style={styles.historyBox}>
                    <Text style={styles.title}>搜索历史</Text>
                    <View style={styles.hotWordsBox}>
                        <Text style={styles.historyWords}>鬼灭之刃</Text>
                        <Text style={styles.historyWords}>哈哈哈</Text>
                        <Text style={styles.historyWords}>是没事没事</Text>
                        <Text style={styles.historyWords}>js</Text>
                        <Text style={styles.historyWords}>vue</Text>
                        <Text style={styles.historyWords}>react</Text>
                        <Text style={styles.historyWords}>锤子哦</Text>
                        <Text style={styles.historyWords}>哔哩哔哩</Text>
                    </View>
                    <View style={styles.cleanHotWordsBox}>
                        <Text style={{ fontFamily: 'iconfont', marginRight: 3, fontSize: 15, color: '#c4c4c4' }}>&#xe691;</Text>
                        <Text style={{ color: '#c4c4c4', fontSize: 12 }}>清空搜索历史</Text>
                    </View>
                </View>
            </ScrollView >
        )
    }

    _renderSuggestWords = () => {
        return (
            <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                {
                    Object.keys(this.state.suggestWordsList).map((key, index) =>
                        <TouchableHighlight
                            key={index}
                            onPress={() => { this._renderResultbyHotWord(this.state.suggestWordsList[key].value) }}
                            underlayColor="#f3f3f3">
                            <Text
                                style={styles.suggestWord}>
                                {this.state.suggestWordsList[key].value}
                            </Text>
                        </TouchableHighlight>)
                }
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {this._renderSearch()}
                    <View style={{ flex: 1, position: 'relative' }}>
                        {this.state.inputValue.trim() && this.state.searchResultFlag ?
                            <SearchResult
                                // keyword={this.state.inputValue}
                                resultClssfiy={this._searchResultClssfiy}
                                result={this.state.searchResultList}
                                ref="searchResult">
                            </SearchResult>
                            : this._renderHotSearch()}
                        {this.state.inputValue.trim() && this.state.focusFlag ? this._renderSuggestWords() : null}
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderColor: '#fb7b9e'
    },
    search: {
        flex: 6,
        borderWidth: 0.8,
        borderColor: '#fb7b9e',
        borderRadius: 20,
        marginLeft: 12,
        marginRight: 12,
        padding: 4,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    seachText: {
        flex: 1,
        color: '#fb7b9e',
        fontSize: 15,
    },
    seachInput: {
        width: '80%',
        height: 22,
        fontSize: 14,
        // margin:0,
        padding: 0,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontWeight: '700',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    HotSearchBox: {
        padding: 5,
    },
    hotWordsBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    WordItem: {
        width: '50%',
        paddingTop: 7,
        paddingBottom: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    wordNum1: {
        width: 20,
        textAlign: 'center',
        color: '#888',
        fontWeight: '700'
    },
    wordNum2: {
        width: 20,
        textAlign: 'center',
        color: '#000',
        fontWeight: '700'
    },
    historyBox: {
        padding: 5
    },
    historyWords: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 4,
        backgroundColor: '#f6f6f6',
        marginRight: 5,
        marginBottom: 8
    },
    cleanHotWordsBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    suggestWord: {
        backgroundColor: '#fff',
        height: 45,
        borderBottomWidth: 0.2,
        borderColor: '#ccc',
        paddingRight: 8,
        paddingLeft: 8,
        textAlignVertical: 'center'
    }
})

export default Search;