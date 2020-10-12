import React, { Component } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { create } from 'react-test-renderer'


class EndProjectList extends Component {
    render() {
        return (
            <View style={style.container}><Text>End ProjectList</Text></View>
        )
    }
}
const style = StyleSheet.create({
    container: {
      flex: 1,
    },
})

export default EndProjectList
