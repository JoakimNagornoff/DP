import React, { Component } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import formdateDate from 'components/DatePickerModal/components/formdateDate/formatDate';
import shortenString from '@components/DatePickerModal/components/shortenString/shortenString';
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from 'store';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';

import BackButton from 'components/BackButton/BackButton';
import {AddNewProjectNote, requestApiProjectNotesData} from 'store/actions/ProjectNotes/action'


function ItemNote({title, text}) {
    return (
      <View style={style.projectItem}>
        <Text>{title}</Text>
        <Text>{text}</Text>
      </View>
    );
  }
  interface State {
    addNoteShow: boolean
    title: string
    text: string
  }

class ProjectNotes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addNoteShow: false,
      title: '',
      text: ''
    }
  }
  componentDidMount() {
   this.test()
  }
  test () {
    const projectId= this.props.project?.id
  this.props.requestApiProjectNotesData({projectId})
  }

  
  CloseNoteShow() {
    this.setState({
      addNoteShow: false,
    });
  }
    render() {
      const {navigate} = this.props.navigation;

        return (
            <View style={style.container}>
              {this.props.loading && (
         <ActivityIndicatorExample/>
        )}
        {console.log(this.props.notes)}
            <FlatList
              data={this.props.notes}
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
      notes: state.projectNote.data,
     
      project: state.project.data.find(project => project.id === props.route.params.id),
    };
  }
  const mapDispatchToProps = {
    AddNewProjectNote,
    requestApiProjectNotesData

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
      fontSize: 18,
      fontWeight: 'bold',
      padding: 5,
    },
  })

export default connector(ProjectNotes);