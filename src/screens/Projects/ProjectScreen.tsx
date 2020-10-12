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

import {
  AddProjectDate,
  AddProjectHours,
  submitWorkingDay,
  submitNewNote,
  AddNotesText,
  AddNotesTitle,
  getAllNotes,
} from 'store/actions/action';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePickerModal from '@components/DatePickerModal/DatePickerModal';
import formdateDate from 'components/DatePickerModal/components/formdateDate/formatDate';
import shortenString from '@components/DatePickerModal/components/shortenString/shortenString';
import BackButton from '@components/BackButton/BackButton';
import {firebase} from '@react-native-firebase/firestore';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TwentyDays from '@components/DatePickerModal/components/TwentyDays'
import TwentyDaysBack from '@components/DatePickerModal/components/TwentyDaysBack'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

//func Item WorkinDay
function Item({date, hours}) {
  return (
    <View style={style.projectItem}>
      <Text>{formdateDate(date)}</Text>
      <Text>{hours}</Text>
    </View>
  );
}
//func Item Project Note
function ItemNote({title, text}) {
  return (
    <View style={style.projectItem}>
      <Text>{title}</Text>
      <Text>{shortenString(text)}</Text>
    </View>
  );
}
interface State {
  thisProject: [];
  thisProjectNotes: any[];
  newProjectNotes: any[];
  show: boolean;
  datepickerOpen: boolean;
  addNoteShow: boolean;
}

class ProjectScreen extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      thisProject: [],
      thisProjectNotes: [],
      newProjectNotes: [],
      show: false,
      datepickerOpen: false,
      addNoteShow: false,
    };
  }
  _onChange = form => console.log(form);
  setDate = (event, date) => {
    this.setState({datepickerOpen: false});
    if (!!date) {
      this.props.AddProjectDate(formdateDate(date));
    }
  };

  //Submit WorkingDay method
  handleSubmitToFirebase() {
    this.props.submitWorkingDay(
      this.props.route.params.id,
      this.props.date,
      this.props.hours,
    );
    this.setState({
      show: false,
    });
  }
  //Submit project note method
  handleSubmitProjectNoteFirebase() {
    this.props.submitNewNote(
      this.props.route.params.id,
      this.props.title,
      this.props.text,
    );
    this.setState({
      addNoteShow: false,
    });
    this.getProjectNotes();
  }
  closeShow() {
    this.setState({
      show: false,
    });
    this.props.AddProjectDate('');
  }
  CloseNoteShow() {
    this.setState({
      addNoteShow: false,
    });
  }

  getProjectNotes() {
    firebase
      .firestore()
      .collection('ProjectNotes')
      .where('projectId', '==', this.props.route.params.id)
      .get()
      .then(result => {
        const thisProjectNotes = result.docs.map(doc => {
          return {id: doc.id, ...doc.data()};
        });
        this.setState({
          thisProjectNotes,
        });
      });
  }

  componentDidMount() {
    this.getProjectNotes();
  }



  render() {
    const {navigate} = this.props.navigation;
    if (!this.props.project) {
      return <Text>Error loading project</Text>;
    }

    const {name} = this.props.route.params;
    const {id} = this.props.route.params;
    //console.log('render', this.state.thisProjectNotes.length);
    return (
      <View style={style.container}>
        <Text style={style.headerTitle}>{name}</Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({addNoteShow: true});
          }}
          style={style.addNoteButton}>
          <Text style={style.addNoteButtonText}>add</Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={this.state.addNoteShow}>
          <View style={{backgroundColor: ' #ff0000', flex: 1}}>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 50,
                padding: 40,
                width: 300,
                height: 400,
              }}>
              <BackButton
                onPress={() => {
                  this.CloseNoteShow();
                }}
              />
              <Text style={style.headerTitle}>{name}</Text>
              <Text>Anteckningar</Text>
              <TextInput
                style={style.input}
                placeholder="Titel"
                onChangeText={this.props.AddNotesTitle}
              />
              <TextInput
                style={style.input}
                placeholder="Text"
                onChangeText={this.props.AddNotesText}
              />
              <TouchableOpacity
                onPress={() => {
                  this.handleSubmitProjectNoteFirebase();
                }}>
                <Text>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={style.topMiddleView}>
          <Text>Projekt Anteckningar</Text>
          {!!this.state.thisProjectNotes && (
            <SafeAreaView style={style.container}>
              <FlatList
                data={this.state.thisProjectNotes}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate('ProjectNote', {
                        id: item.id,
                        title: item.title,
                        text: item.text,
                      })
                    }>
                    <ItemNote title={item.title} text={item.text} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </SafeAreaView>
          )}
        </View>

        <View style={style.middleView}>
          <Text>Arbetsdagar</Text>
          {!!this.props.project.workingDays && (
            <SafeAreaView style={style.container}>
              <FlatList
                data={this.props.project.workingDays}
                renderItem={({item}) => (
                  <Item date={item.date} hours={item.hours} />
                )}
                keyExtractor={item => item.date.toString() + item.hours}
              />
            </SafeAreaView>
          )}
        </View>
        <View style={style.bottomView}>
          <TouchableOpacity
            style={style.addButton}
            onPress={() => {
              this.setState({show: true});
            }}>
            <Text style={style.textAddButton}>Lägg till</Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={this.state.show}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                backgroundColor: '#ffffff',
                margin: 50,
                padding: 40,
                width: 300,
                height: 400,
              }}>
              <BackButton
                onPress={() => {
                  this.closeShow();
                }}
              />
              <Text style={style.headerTitle}>{name}</Text>
              <Text style={{fontSize: 22}}>Lägg till tid</Text>
              <TextInput
                style={style.input}
                placeholder="Timmar"
                keyboardType="numeric"
                onChangeText={this.props.AddProjectHours}
              />
              <Button
                title={this.props.chooseDate || 'Datum'}
                onPress={() => {
                  this.setState({datepickerOpen: true});
                }}
              />

              {this.state.datepickerOpen && (
                <RNDateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={
                  this.props.chooseDate ? new Date(this.props.chooseDate) : new Date()
                }
                maximumDate={new Date(TwentyDays)}
                minimumDate={new Date(TwentyDaysBack)}
                mode="date"
                onChange={this.setDate}
              />
              ) }

              <TouchableOpacity
                onPress={() => {
                  this.handleSubmitToFirebase();
                }}
                style={style.addSubmitButtonFireBase}>
                <Text style={style.textAddButton}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => {console.log('avsluta')}}><Text>Avsuta project</Text></TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    chooseDate: state.projectReducer.chooseDate,
    store: state,
    hours: state.projectReducer.chooseHours,
    date: state.projectReducer.chooseDate,
    project: state.projectReducer.projects.find(
      project => project.id === props.route.params.id,
    ),
    note: state.notesReducer.notes,
    title: state.notesReducer.text,
    text: state.notesReducer.title,
    createdAt: state.notesReducer.createdAt
  };
}
const mapDispatchToProps = {
  AddProjectDate,
  submitWorkingDay,
  AddProjectHours,
  submitNewNote,
  AddNotesText,
  AddNotesTitle,
  getAllNotes,
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
    flex: 0.8,
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
  },
  textAddButton: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
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
  dateButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 60,
    width: 360,
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
  addSubmitButtonFireBase: {
    width: 60,
    height: 40,
    alignSelf: 'center',
    borderWidth: 2,
  },
});

export default connector(ProjectScreen);
