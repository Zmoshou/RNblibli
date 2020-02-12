import React, { Component } from 'react';
import { View, ProgressBarAndroid, Text } from 'react-native'
import { WebView } from "react-native-webview";
import { Header, Button, Icon, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux'


class webView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: null
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: "#fb7b9e" }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>

                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                </Header>
                {/* {this.state.progress !== 1 && <ProgressBarAndroid
                    style={{ marginTop: 220 }}
                    // styleAttr="Horizontal"
                    color="#fb7b9e"
                    progress={this.state.progress} />} */}
                <WebView
                    source={{ uri: this.props.webUrl }}
                    onLoadProgress={({ nativeEvent }) => this.setState(
                        { progress: nativeEvent.progress }
                    )}
                />
            </View>
        );
    }
}

export default webView;