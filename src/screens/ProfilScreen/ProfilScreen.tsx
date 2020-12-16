import { firebase } from '@react-native-firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


class ProfilScreen extends Component {
    state = {
        newPassword : '',
        currentView: false
    }
    render() {
        const user = firebase.auth().currentUser
        return (
            <View style={style.container}>
                <Text>{user?.displayName}</Text>
            {this.state.currentView && (
                <NewPasswordView/>
            )}
           <TouchableOpacity onPress={() => {
             this.setState({currentView: true})

           }}><Text>new password please</Text></TouchableOpacity></View>
           
        )
    }
}


  function NewPasswordView({}) {
      return (
          <View style={style.container}><Text>new password view</Text>
          <TextInput ></TextInput></View>
      )
  }


  const style = StyleSheet.create({
      container: {
          flex: 1
      }
  })

  


export default ProfilScreen