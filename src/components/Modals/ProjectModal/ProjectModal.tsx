import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {ApplicationState, RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import BackButton from 'components/BackButton/BackButton';
import {hideProjectModal} from 'store/actions/Modals/action'
import {AddNewProject} from 'store/actions/Project/action'
import AsyncStorage from '@react-native-async-storage/async-storage';




interface State {
    name: string
}

class ProjectModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    create = async() =>  {
        const {name} = this.state
        this.props.AddNewProject({name})
       this.props.hideProjectModal()
      }
      
    render() {
        return (
            <Modal transparent={true} visible={this.props.modal.openProjectModal}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 50,
                padding: 40,
                width: 300,
                height: 350,
              }}>
              <BackButton
                onPress={() => {
                this.props.hideProjectModal()
                }}
              />
              <Text style={{fontSize: 30}}>Lägg till Projekt</Text>
              <TextInput
                style={style.input}
                placeholder="Projekt"
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
              />
              <TouchableOpacity
                onPress={() => {
                    this.create()
                }}>
                <Text>Lägg till</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        )
    }
}

function mapStateToProps(state: ApplicationState) {
    return {
      store: state,
      modal: state.modal
    };
  }
  const mapDispatchToProps = {
    AddNewProject,
    hideProjectModal
  
   }
  
  const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  type PropsFromRedux = ConnectedProps<typeof connector>;
  type Props = PropsFromRedux & {
    navigation: any;
    route: any;
  };
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
      },
})

export default connector(ProjectModal)