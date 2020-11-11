import React, {Component} from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import BackButton from 'components/BackButton/BackButton';
import {closeModal, hideModalProjectNote} from 'store/actions/Modals/action'
import {AddNewProjectNote} from 'store/actions/ProjectNotes/action'
import { firebase } from '@react-native-firebase/auth';


interface State {
    title: string,
    text: string
}

class ProjectNoteModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
            this.state = {
                title: '',
                text: ''
            
        }
    }
//adderar uid till projectnote för att kolla upp om användaren kan deleta
    create() {
        const {title, text} = this.state
        const projectId = this.props.project?.id  
        const uid = firebase.auth().currentUser?.uid
        this.props.AddNewProjectNote({projectId},{title}, {text}, {uid})
        this.props.hideModalProjectNote()
      }
    render() {
        return (
            <Modal transparent={true} visible={this.props.modal.openNoteModal} >
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  margin: 50,
                  padding: 40,
                  width: 300,
                  height: 400,
                }}>
                <BackButton
                  onPress={() => {
                      this.props.hideModalProjectNote()
                    
                  }}
                />
                <Text style={style.headerTitle}>{ProjectNoteModal.name}</Text>
                <TextInput
                      style={style.input}
                      placeholder="title"
                      value={this.state.title}
                      onChangeText={(text) => this.setState({title: text})}
                    />
                     <TextInput
                      style={style.input}
                      placeholder="Text"
                      value={this.state.text}
                      onChangeText={(text) => this.setState({text: text})}
                    />
                   
                   <TouchableOpacity
                  onPress={() => {this.create()}}
                  style={style.addSubmitButtonFireBase}>
                  <Text style={style.textAddButton}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        )
    }
}



function mapStateToProps(state: RootState, props: OwnProps) {
    return {
      project: state.project.data.find(project => project.id === props.route.params.id),
      hours: state.project.chooseHours,
      date: state.project.chooseDate,
      modal: state.modal,
      store: state
    };
  }
  const mapDispatchToProps = {
    closeModal,
    AddNewProjectNote,
    hideModalProjectNote
  };
  const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  type PropsFromRedux = ConnectedProps<typeof connector>;
  type OwnProps = {
    navigation: any;
    route: any;
  };

  type Props = PropsFromRedux & OwnProps;

  const style = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
      },
      input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
      },
      addSubmitButtonFireBase: {
        width: 60,
        height: 40,
        alignSelf: 'center',
        borderWidth: 2,
      },
      textAddButton: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
      },
    })


    export default connector(ProjectNoteModal);