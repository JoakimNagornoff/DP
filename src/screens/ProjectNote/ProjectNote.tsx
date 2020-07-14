import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';

class ProjectNote extends Component<Props, {}> {
   
  render() {
    const { note } = this.props;

    if (!note) {
      return (
        <View style={style.container}>
          <Text>hitta inte</Text>

        </View>
      )
    }

    return (
      <View style={style.container}>
        <Text>{this.props.note?.title}</Text>
        <Text>{this.props.note?.text}</Text>
      </View>
    );
  }
}

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    note: state.projectReducer.projects.find(p => p.id === props.route.params.id)?.projectNotes[props.route.params.index]
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
});

export default connector(ProjectNote);
