import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {State} from 'react-native-gesture-handler';

class LoginInScreen extends Component<Props, {}> {
  state = {
    email: '',
    password: '',
  };

  handleLogin = () => {
    this.props.AuthLogin(this.state.email, this.state.password, () => {
      this.setState({
        email: '',
        password: '',
      });
      this.props.navigation.navigate('Home');
    });
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={style.container}>
        <Text>Välkommen till DP opt</Text>
        <View>
          <Text>Email address</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          <Text>PW</Text>
          <TextInput
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

  };
}
const mapDispatchToProps = {
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
});

export default connector(LoginInScreen);
