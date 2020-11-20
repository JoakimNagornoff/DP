import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {AuthLoginUser} from 'store/actions/Users/action'
import AsyncStorage from '@react-native-async-storage/async-storage';
class LoginInScreen extends Component<Props, {}> {
  state = {
    email: '',
    password: '',
  };

componentDidMount() {
  this.refresh()
 
}
  handleLogin = async () => {
      const {email, password} = this.state
      await firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
        if(data.user)
      console.log(data)
    })
    this.props.navigation.navigate('Home')
  }
  refresh(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        firebase.auth().currentUser?.getIdToken(true).then(function(idToken){
          console.log(idToken)
          AsyncStorage.setItem('@idToken', idToken)
         // console.log(idToken)
        
        })       
        this.props.navigation.navigate('Home')
      } else {
        this.props.navigation.navigate('LogIn')
      }
  });
  }
 

  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={style.container}>
        <Text>Välkommen till DP opt</Text>
        <View>
          <Text>Email address</Text>
          <TextInput style={style.input}
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Text>PW</Text>
          <TextInput
            style={style.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this.handleLogin}>
            <Text style={{color: 'black', fontWeight: '500'}}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    user: state.user.data
  };
}
const mapDispatchToProps = {
  AuthLoginUser,
};
const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  navigation: any;
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  input : {
    height: 200
  }
});

export default connector(LoginInScreen);
