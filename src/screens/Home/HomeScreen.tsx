import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {ApplicationState} from '/store/index';
import {
  requestApiProjectData,
  AddNewProject, 
  requestApiProjectDataWithId
} from 'store/actions/Project/action';
import {
  requestApiProjectNoteData
} from 'store/actions/ProjectNotes/action'
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import BackButton from 'components/BackButton/BackButton';
import ProjectList from '@components/ProjectList/ProjectList'
import firestore from '@react-native-firebase/firestore';


interface State {
  show: boolean;
  name: string;
  test: boolean

}

class HomeScreen extends Component<Props, State, {}> {
  unsubscribe: void;
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      name: '',
      test: false
    };
  }
  componentDidMount() {
    //this.props.requestApiProjectData()
    this.firebaseTest()
    this.test()
  }

 
  onItemClicked() {
    this.props.navigation.navigate('Projects'), {};
  }
  
  openModal () {
    this.setState({show: true})
  }
  closeModal () {
    this.setState({show: false})
  }
  create() {
    const {name, show} = this.state
   this.props.AddNewProject({name})
   this.setState({show: false})

  }
  test() {
   

  }
   firebaseTest ()  {
      const id = [];
    const docs = this.props.project

    for(const doc of docs){
      const selectedProjects = {
        id : doc.id
      }
      id.push(selectedProjects)
      console.log('id array',id)
    }
     let addedId = ''
   firestore().collection('Projects')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        if(change.doc.id){
          addedId = ''
        }
        else {
          addedId = change.doc.id
        }  
      }
      if(change.type === 'modified') {
        if(change.doc.exists){
          addedId = ''
        } else {
          addedId = change.doc.id
        }
      }
      if(change.type ==='removed'){
        console.log('Removed Project: ', change.doc.data());
          
      }
    });
    const id = addedId
    console.log(id)
    this.props.requestApiProjectDataWithId({id})
    addedId = ''
  });
  
  }
  render() {
    const {navigate} = this.props.navigation;
  
    return (
      <View style={style.container}>
        {this.props.loading && (
          <Text>loading</Text>
        )}
      
       <ProjectList navigation={this.props.navigation}></ProjectList>
        <Modal transparent={true} visible={this.state.show}>
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
                  this.closeModal();
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
        <View style={style.middleContainer}></View>
        <View style={style.bottomContainer}>
        <TouchableOpacity  style={style.notesSceenButton} onPress={() => {this.openModal()}}><Text>TEST</Text></TouchableOpacity>
        </View>
        </View>

        
       

    );
  }
}



function mapStateToProps(state: ApplicationState) {
  return {
    store: state,
    loading: state.project.loading,
    project: state.project.data,
  };
}
const mapDispatchToProps = {
  requestApiProjectData,
  AddNewProject,
  requestApiProjectNoteData,
  requestApiProjectDataWithId
};

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
  middleContainer: {
    flex: 1.5,

  },
  bottomContainer: {
    flex: 0.2,

  },
  
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 80,
    width: 360,
  },
  notesSceenButton: {
    height: 40,
    width: 360,
    borderRadius: 1,
    alignSelf: 'center',
    backgroundColor: '#5bb1cd',
  },
  topButtons: {
    flexDirection: 'row'
  }
});

export default connector(HomeScreen);
