import { Header, Left, Body, Right, Button, Icon, Title, Tab, Tabs, ScrollableTab } from 'native-base';
// import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
} from 'react-native';
class moreDiantai extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#fb7b9e", position: "relative" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

export default moreDiantai;