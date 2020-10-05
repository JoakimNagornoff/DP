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
import {RootState} from '/store/index';
import {
  AddProjectName,
  getAllProjects,
  submitNewProject,
  getAllNotes,
} from 'store/actions/action';
import firebase from '@react-native-firebase/app';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import BackButton from 'components/BackButton/BackButton';

interface State {
  show: boolean;
}
//function Item Project
function Item({name}) {
  return (
    <View style={style.projectItem}>
      <Text>{name}</Text>
    </View>
  );
}

class HomeScreen extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    this.props.getAllProjects();
    this.props.getAllNotes();
  }
  onItemClicked() {
    this.props.navigation.navigate('Projects'), {};
  }

  handleSubmitClick() {
    this.props.submitNewProject(this.props.store);
    this.setState({
      show: false,
    });
  }
  closeShow() {
    this.setState({
      show: false,
    });
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={style.container}>
        <TouchableOpacity
          style={style.notesSceenButton}
          onPress={() => {
            navigate('Notes');
          }}>
          <Text>Anteckningar</Text>
        </TouchableOpacity>

        <Text>Projekt</Text>
        <FlatList
          data={this.props.projects}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigate('Projects', {
                  id: item.id,
                  name: item.name,
                })
              }>
              <Item name={item.name} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />

        <Button
          title="show"
          onPress={() => {
            this.setState({show: true});
          }}
        />

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
                  this.closeShow();
                }}
              />
              <Text style={{fontSize: 30}}>Lägg till Projekt</Text>
              <TextInput
                style={style.input}
                placeholder="Projekt"
                onChangeText={this.props.AddProjectName}
                value={this.props.projectName}
              />
              <TouchableOpacity
                onPress={() => {
                  this.handleSubmitClick();
                }}>
                <Text>Lägg till</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    projectName: state.projectReducer.name,
    store: state,
    projects: state.projectReducer.projects,
    note: state.notesReducer,
  };
}
const mapDispatchToProps = {
  AddProjectName,
  getAllProjects,
  submitNewProject,
  getAllNotes,
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
});

export default connector(HomeScreen);
