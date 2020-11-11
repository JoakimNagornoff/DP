import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {ApplicationState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import {
updateProjectNote,
requestApiDeleteNote
} from 'store/actions/ProjectNotes/action';

interface State {
  editTitle: boolean;
  editText: boolean;
  title: string;
  text: string;
  id: string
}

class ProjectNote extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editTitle: true,
      editText: false,
      title: props.route.params.title,
      text: props.route.params.text,
      id: props.route.params.id
    };
  }
  handleEditable = () => this.setState({editTitle: true});
  handleSubmitProjectNoteFirebase() {
    const {id,title,text} = this.state
    console.log(id)
    if(title!=='' && text!== ''){
    this.props.updateProjectNote(
      {id},
     {title},
      {text}
    )
    }
   
    this.props.navigation.goBack()

  }
  handleDeleteProjectNote() {
    const {id} = this.state
    if ( id !== null){
      this.props.requestApiDeleteNote({id})
    }
  this.props.navigation.goBack()
  }

  render() {
    const {note} = this.props;
   
    if (!note) {
      return (
        <View style={style.container}>
          <Text>hitta inte</Text>
        </View>
     );
    }
  
    return (
      <View style={style.container}>
        <View style={style.titleView}>
          <TextInput
            style={style.input}
            placeholder={this.state.title}
            value={this.state.title}
            onChangeText={(title)=>{this.setState({title:title})}}
          />
          <TextInput
            style={style.input}
            placeholder={this.state.text}
            value={this.state.text}
            onChangeText={(text)=>{this.setState({text:text})}}
          />
        </View>
        <View style={style.buttonView}>
          <TouchableOpacity
            onPress={() => {
              this.handleSubmitProjectNoteFirebase();
            }}>
            <Text>ADD</Text>
          </TouchableOpacity>
          
        </View>
        
        <TouchableOpacity onPress={() => {
          this.handleDeleteProjectNote()
        }}><Text>TA BORT MIG</Text></TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state: ApplicationState, props: OwnProps) {
  return {
    //note: state.projectReducer.projects.find(p => p.id === props.route.params.id)?.projectNotes[props.route.params.index],
    note: state.projectNote.data
  };
}
const mapDispatchToProps = {
  updateProjectNote,
  requestApiDeleteNote

};
const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);
type OwnProps = {
  navigation: any;
  route: any;
};
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & OwnProps;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    flex: 0.4,
    backgroundColor: 'lightgray',
  },
  buttonView: {
    flex: 0.6,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    height: 100,
    fontSize: 15,
    color: '#161F3D',
  },
  textAddButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
  addSubmitButtonFireBase: {
    width: 60,
    height: 40,
    alignSelf: 'center',
    borderWidth: 2,
  },
});

export default connector(ProjectNote);
