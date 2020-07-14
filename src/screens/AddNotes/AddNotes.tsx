import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import {AddNotesTitle, AddNotesText, submitNewNote} from 'store/actions/action';
import {TouchableOpacity} from 'react-native-gesture-handler';

class AddNotes extends Component<Props, {}> {
  handleSubmitNoteToFirebase() {
    this.props.submitNewNote(this.props.store);
  }
  render() {
    return (
      <View style={style.container}>
        <Text>Title</Text>
        <TextInput
          placeholder="Lägg title"
          onChangeText={this.props.AddNotesTitle}
        />
        <Text>Add text</Text>
        <TextInput
          placeholder="Lägg till text"
          onChangeText={this.props.AddNotesText}
        />
        <TouchableOpacity
          onPress={() => {
            this.handleSubmitNoteToFirebase();
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    title: state.notesReducer.title,
    text: state.notesReducer.text,
    store: state,
  };
}
const mapDispatchToProps = {
  AddNotesTitle,
  AddNotesText,
  submitNewNote,
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
});

export default connector(AddNotes);
