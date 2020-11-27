import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from 'store';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';

import {AddNewProjectNote, requestApiProjectNotesData, requestApiNoteByid} from 'store/actions/ProjectNotes/action'


function ItemNote({title, text}) {
    return (
      <View style={style.projectItem}>
        <Text>{title}</Text>
        <Text>{text}</Text>
      </View>
    );
  }
  interface State {
    title: string
    text: string
  }

class ProjectNotes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    }
  }
  handleRefresh () {
  const projectId= this.props.project?.id
   this.props.requestApiProjectNotesData({projectId})
  }
    render() {
      const {navigate} = this.props.navigation;
      if (!this.props.notes) {
        return <Text>Error notes project</Text>;
      }
        return (
            <View style={style.container}>
              {this.props.loading && (
         <ActivityIndicatorExample/>
        )}
        {this.props.notes.length === 0 && (
          <Text style={style.textAddButton}>Dra för att ladda notes</Text>
        )}
        {console.log('test',this.props.notes.length)}
       
            <FlatList
              data={this.props.notes}
              onRefresh={() => this.handleRefresh()}
              refreshing={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigate('ProjectNote', {
                      id: item.id,
                      title: item.note.title,
                      text: item.note.text
                     
                    })
                  }>
                  <ItemNote title={item.note.title} text={item.note.text}/>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
           
          </View>
          )
        
    }
}

function mapStateToProps(state: ApplicationState, props : OwnProps) {
    return {
      store: state,
      loading: state.project.loading,
      notes: state.projectNote.data.filter(note => note.note.projectId === props.route.params.id),
      project: state.project.data.find(project => project.id === props.route.params.id),
    };
  }
  const mapDispatchToProps = {
    AddNewProjectNote,
    requestApiProjectNotesData,
    requestApiNoteByid

  };

  const connector = connect(
    mapStateToProps,
    mapDispatchToProps
  );
  
  type PropsFromRedux = ConnectedProps<typeof connector>;
  type OwnProps =  {
    navigation: any;
    route: any;
  };
  type Props = PropsFromRedux & OwnProps;

  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    projectItem: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      height: 60,
      width: 360,
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
    },
    input: {
      borderBottomColor: '#8A8F9E',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      color: '#161F3D',
    },
    addSubmitButtonFireBase: {
      width: 60,
      height: 40,
      alignSelf: 'center',
      borderWidth: 2,
    },
    textAddButton: {
      textAlign: 'center',
      fontSize: 12,
      padding: 5,
    },
  })

export default connector(ProjectNotes);