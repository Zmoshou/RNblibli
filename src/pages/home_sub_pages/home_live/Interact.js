import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'


class Interacts extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <View style={{ flex: 1, position: 'relative',backgroundColor:'yellow' }}>
                <Text>Interacts</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({


})



export default Interacts;