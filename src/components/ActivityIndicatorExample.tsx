import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

const ActivityIndicatorExample = () => (
  <View style={style.container}>
    <ActivityIndicator
      animating
      color="#008000"
      size="large"
      style={style.activityIndicator}
    />
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default ActivityIndicatorExample;
