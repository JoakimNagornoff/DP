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
} from 'store/actions/ProjectNotes/action'
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import ProjectList from '@components/ProjectList/ProjectList'
import firestore, { firebase } from '@react-native-firebase/firestore';
import {showProjectModal} from 'store/actions/Modals/action'
import ProjectModal from 'components/Modals/ProjectModal/ProjectModal';


interface State {
  name: string;

}

class HomeScreen extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  //firebase listener test
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
    if(!this.props.project) {
      return <Text>Dra för att ladda project</Text>
  }
    
    return (
     
    
      <View style={style.container}>
        
        {this.props.loading && (
         <ActivityIndicatorExample></ActivityIndicatorExample>
        )}
      
     <ProjectList navigation={this.props.navigation}></ProjectList>
       <ProjectModal route={this.props.route}></ProjectModal>
        
        <View style={style.middleContainer}></View>
        <View style={style.bottomContainer}>
  
        <TouchableOpacity  style={style.notesSceenButton} onPress={() => {this.props.showProjectModal()}}><Text>Lägg till Project</Text></TouchableOpacity>
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
  requestApiProjectDataWithId,
  showProjectModal
  

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
