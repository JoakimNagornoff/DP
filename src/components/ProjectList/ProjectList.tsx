import React, { Component } from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from 'store';


function Item({name, id}) {
    return (
      <View style={style.projectItem}>
        <Text>{name}</Text>
        <Text>{id}</Text>
      </View>
    );
  }

class ProjectList extends Component <Props> {
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={style.container}>
            <FlatList
            data={this.props.projects}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                    navigate('Projects', {
                    id: item.id,
                    name: item.project.name,
                  })
                }>
                <Item name={item.project.name} id={item.id} />
               
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
          </View>
        )
    }
}

function mapStateToProps(state: ApplicationState, props: OwnProps) {
    return {
      store: state,
      loading: state.project.loading,
      projects: state.project.data,
    };
  }

  const connector = connect(
    mapStateToProps,
  );
  
  type PropsFromRedux = ConnectedProps<typeof connector>;
  type OwnProps =  {
    navigation: any;
    route: any;
  };
  type Props = PropsFromRedux & OwnProps;

  const style = StyleSheet.create({
    container: {
      flex: 4

    },
    projectItem: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 80,
        width: 360,
      },
  })

  export default connector(ProjectList);