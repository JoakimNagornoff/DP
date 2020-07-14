import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';

import {getAllNotes} from 'store/actions/action';

function Item({title}) {
  return (
    <View style={style.notesItem}>
      <Text>{title}</Text>
    </View>
  );
}

class ViewNotes extends Component<Props, {}> {
  componentDidMount() {
    this.props.getAllNotes();
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={style.container}>
        <FlatList
          data={this.props.notes}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.title}
        />

        <TouchableOpacity
          onPress={() => {
            navigate('AddNotes');
          }}>
          <Text>Add Notes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state: RootState) {
  return {
    notes: state.notesReducer.notes,
  };
}
const mapDispatchToProps = {
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
  notesItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 80,
    width: 360,
  },
});

export default connector(ViewNotes);
