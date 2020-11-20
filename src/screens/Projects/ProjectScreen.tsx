import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Platform,
  UIManager,
} from 'react-native';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';

import {showModal, showModalProjectNote} from 'store/actions/Modals/action'
import {requestDeleteProject, requestMoveProject} from 'store/actions/Project/action'
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import ProjectNotes from '@components/ProjectNoteCard/ProjectNotes'

import WorkindayList from '@components/WorkinDayList/WorkinDayList'
import WorkinDayModal from '@components/Modals/WorkinDayModal';
import ProjectNoteModal from 'components/Modals/ProjectNoteModal';

interface State {
  id: string
}

class ProjectScreen extends Component<Props,State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.route.params.id
    }
  }


  handleDeleteProject() {
    const {id} = this.state
    if(id !== null) {
      this.props.requestDeleteProject({id})
    }
    this.props.navigation.goBack()

  }
  handleMoveEndProject() {
    const {id} = this.state
    if(id !== null) {
      this.props.requestMoveProject({id})
    }
    this.props.navigation.goBack()
   
  }

  render() {
    const {navigate} = this.props.navigation;
    if (!this.props.project) {
      return <Text>Error loading project</Text>;
    }
    const {name, id} = this.props.route.params;
    return (
      <View style={style.container}>
 <TouchableOpacity  style={style.addButton} onPress={() => {
          this.handleDeleteProject();
        }}><Text>TA BORT MIG</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
       this.props.showModalProjectNote()}}><Text>ADD</Text></TouchableOpacity>
      <View style={style.topMiddleView}>
      <Text>Project Notes</Text>
      <ProjectNotes navigation={this.props.navigation}  route={this.props.route}/>
      </View>
      <View style={style.topMiddleView}>
      <Text>Arbetsdagar</Text>
      <WorkindayList  route={this.props.route} />
      </View>


      <View style={style.bottomView}>
          <TouchableOpacity
            style={style.addButton}
            onPress={() => {
              this.props.showModal();
            }}>
            <Text style={style.textAddButton}>Lägg till</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.handleMoveEndProject();
          }}><Text>flytta</Text></TouchableOpacity>
         
        </View> 
       
      
    <WorkinDayModal route={this.props.route} ></WorkinDayModal>
    <ProjectNoteModal route={this.props.route}></ProjectNoteModal>
  
          </View>
    );
  }
}

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    project: state.project.data.find(project => project.id === props.route.params.id),
  };
}
const mapDispatchToProps = {
  showModal,
  showModalProjectNote,
  requestDeleteProject,
  requestMoveProject


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
  container: {
    flex: 1,
  },
  topMiddleView: {
    flex: 1,
  },
  middleView: {
    flex: 1.6,
  },
  bottomView: {
    flex: 0.4,
    marginBottom: 10,
  },
  addButton: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    borderRadius: 1,
    textAlign: 'center',
    backgroundColor: '#add8e6',
    marginEnd: 10,
    marginStart: 10
  },

  headerTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  dateButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
  },

  addNoteButton: {
    width: 60,
    height: 40,
    alignSelf: 'flex-end',
    borderWidth: 2,
    marginRight: 10,
  },
  addNoteButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },

  endProjectModalText: {
    fontSize: 24,
    textAlign: 'center'
  },
  continue: {
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 1,
    width: 200,
  },
  continueText: {
    fontSize: 18,
    textAlign: 'center'
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 60,
    width: 360,
  },
  textAddButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  }
});

export default connector(ProjectScreen);
