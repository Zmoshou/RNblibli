import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native'

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Live from './home_sub_pages/Live';
import Recommended from './home_sub_pages/Recommended';
import Hot from './home_sub_pages/Hot';
import Bangumi from './home_sub_pages/Bangumi';
import Move from './home_sub_pages/Move';
import SeventyYears from './home_sub_pages/SeventyYears';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTabViewLocked: false
    }
  }

  _lockSlide = () => {
    this.setState({
      scrollTabViewLocked: true
    })
  }
  _openSlide = () => {
    this.setState({
      scrollTabViewLocked: true
    })
  }
  render() {
    return (
      <>
        <StatusBar
          backgroundColor='#fb7b9e'
          // translucent={true}
          // hidden={true}
          barStyle={'light-content'}
          animated={true}
        />

        <ScrollableTabView
          initialPage={1}
          renderTabBar={() => <ScrollableTabBar
            style={{
              height: 38, width: '100%',borderWidth:0.25
            }}
            tabStyle={styles.tabStyle}
          />}
          tabBarTextStyle={styles.textStyle}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          tabBarActiveTextColor='#fb7b9e'
          tabBarInactiveTextColor='#666'
        >
          <Live tabLabel='直播'></Live>
          <Recommended tabLabel='推荐'></Recommended>
          <Hot tabLabel='热门'></Hot>
          <Bangumi tabLabel='追番'></Bangumi>
          <Move tabLabel='影视'></Move>
          <SeventyYears tabLabel='70年'></SeventyYears>
        </ScrollableTabView>
      </>
    )
  }
}
const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: '#fb7b9e',
    marginLeft: '4%',
    height: 2.5,
    width: 20
  },
  tabStyle: {
    height: 37,
    paddingLeft: 17,
    paddingRight: 17,
  },
  textStyle: {
    fontSize: 16,
  },
})

export default HomePage;