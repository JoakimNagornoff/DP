import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Projekt</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
