import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import {ApplicationState, RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import BackButton from 'components/BackButton/BackButton';
import { firebase } from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface State {
    name : string
}



class FirstTimeSingInModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name : ''
        }
    }

    async  handleUpdaete  () {
      const {name} = this.state
      if(name !== '' ) {
        await firebase.auth().currentUser?.updateProfile({displayName : name} )  
      }
      this.props.navigation('Home')
       
    }
    render() {
        return (
            <View><Text>FIRSY TIME SIG IN </Text>
            <Text> Lägg till användarnamn</Text>
            <TextInput style={style.input} placeholder={this.state.name} value={this.state.name} onChangeText={(text) => {this.setState({name: text})}}></TextInput>
            <TouchableOpacity onPress={() => {this.handleUpdaete()}}><Text>ADD</Text></TouchableOpacity></View>
        )
    }
}


function mapStateToProps(state: ApplicationState) {
    return {
        modal: state.modal
    }
}

const mapDispatchToProps = {

}

const connector = connect (
    mapStateToProps,
    mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
    navigation : any;
    route: any
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderWidth: 2,
        height: 60,
        fontSize: 15,
        color: '#161F3D',
      },
})

export default connector(FirstTimeSingInModal)