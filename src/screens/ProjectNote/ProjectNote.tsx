import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import {} from 'store/actions/action';

interface State {
  editTitle: boolean;
  editText: boolean;
  title: string;
  text: string;
}

class ProjectNote extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editTitle: true,
      editText: false,
      title: '',
      text: '',
    };
  }
  handleEditable = () => this.setState({editTitle: true});
  handleSubmitProjectNoteFirebase() {
    this.props.route.params.id, this.props.title, this.props.text;
  }

  render() {
    const {note} = this.props;
    const {id} = this.props.route.params;
    const {text} = this.props.route.params;

    if (!note) {
      return (
        <View style={style.container}>
          <Text>hitta inte</Text>
        </View>
      );
    }
    {
      console.log(id);
      console.log(text);
    }
    return (
      <View style={style.container}>
        <View style={style.titleView}>
          <TextInput
            style={style.input}
            placeholder={this.props.title}
            onChangeText={this.props.AddProjectNoteTitle}
          />
          <TextInput
            style={style.input}
            placeholder={this.props.text}
            onChangeText={this.props.AddProjectNoteText}
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
      </View>
    );
  }
}

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    // note: state.projectReducer.projects.find(p => p.id === props.route.params.id)?.projectNotes[props.route.params.index],
    title: state.notesReducer.title,
    text: state.notesReducer.text,
    note: state.notesReducer.notes,
  };
}
const mapDispatchToProps = {};
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
