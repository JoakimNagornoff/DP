import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const BackButton = props => {
  return (
    <TouchableOpacity style={style.button} onPress={props.onPress}>
      <Text style={style.buttonText}>X</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    height: 20,
    width: 20,
  },
  buttonText: {
    fontSize: 22,
  },
});

export default BackButton;
