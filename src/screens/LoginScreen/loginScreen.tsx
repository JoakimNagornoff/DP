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
    this.setState({email: '', password: ''})
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
        <View style={style.topView}>
        <Text style={style.headerTitle}>Välkommen till DP opt</Text>
        </View>
        <View style={style.middleView}>
          <Text style={style.inputTitle}>Email address</Text>
          <TextInput style={style.input}
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Text style={style.inputTitle}>PW</Text>
          <TextInput
            style={style.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
          />
          </View>
           <View style={style.topView}>
          <TouchableOpacity style={style.singInButton} onPress={this.handleLogin}>
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
  topView: {
    flex: 0.3,
  },
  middleView: {
    flex: 0.4,
  },
  bottomView: {
    flex: 0.2,
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 60,
    fontSize: 15,
    color: '#161F3D',
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 32,
  },
  singInButton: {
    marginHorizontal: 30,
    backgroundColor: '#E9446A',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connector(LoginInScreen);
