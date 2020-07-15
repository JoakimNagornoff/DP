import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  UIManager,
  Platform,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import firebase from '@react-native-firebase/app';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  AddProjectDate,
  AddProjectHours,
  submitWorkingDay,
  AddProjectNoteTitle,
  AddProjectNoteText,
  submitProjectNote,
  getAllNotes,
} from 'store/actions/action';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import projectReducer from 'store/reducers/projectReducer';
import {SafeAreaView} from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TwentyDays = new Date(
  new Date().getTime() + 24 * 60 * 60 * 1000 * 20,
).toLocaleDateString();

const TwentyDaysBack = new Date(
  new Date().getTime() - 24 * 60 * 60 * 60 * 1000 * 20,
).toLocaleDateString();

function formatDate(date: string | Date | number) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function shortenString(text: string) {
  const MAX_LENGTH = 50;
  if (text.length <= MAX_LENGTH) {
    return text;
  }
  return text.substring(0, MAX_LENGTH - 3) + '...';
}

interface State {
  thisProject: any[];
  show: boolean;
  datepickerOpen: boolean;
  addNoteShow: boolean;
}

function Item({date, hours}) {
  return (
    <View style={style.projectItem}>
      <Text>{formatDate(date)}</Text>
      <Text>{hours}</Text>
    </View>
  );
}
function ItemNote({title, text}) {
  return (
    <View style={style.projectItem}>
      <Text>{title}</Text>
      <Text>{shortenString(text)}</Text>
    </View>
  );
}

class ProjectScreen extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      thisProject: [],
      show: false,
      datepickerOpen: false,
      addNoteShow: false,
    };
  }
  _onChange = form => console.log(form);
  setDate = (event, date) => {
    this.setState({datepickerOpen: false});
    if (date) {
      this.props.AddProjectDate(formatDate(date));
    }
  };
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
  handleSubmitProjectNoteFirebase() {
    this.props.submitProjectNote(
      this.props.route.params.id,
      this.props.title,
      this.props.text,
    );
    this.setState({
      addNoteShow: false,
    });
  }
  closeShow() {
    this.setState({
      show: false,
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    if (!this.props.project) {
      return <Text>No project lol</Text>;
    }

    const {name} = this.props.route.params;
    const {id} = this.props.route.params;

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
              <Text style={style.headerTitle}>{name}</Text>
              <Text>Anteckningar</Text>
              <TextInput
                style={style.input}
                placeholder="Titel"
                onChangeText={this.props.AddProjectNoteTitle}
              />
              <TextInput
                style={style.input}
                placeholder="Text"
                onChangeText={this.props.AddProjectNoteText}
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
          {!!this.props.project.projectNotes && (
            <SafeAreaView style={style.container}>
              <FlatList
                data={this.props.project.projectNotes}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate('ProjectNote', {
                        index,
                        id,
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
              <TouchableOpacity
                onPress={() => {
                  this.closeShow();
                }}>
                <Text>X</Text>
              </TouchableOpacity>
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
                    this.props.chooseDate
                      ? new Date(this.props.chooseDate)
                      : new Date()
                  }
                  maximumDate={new Date(TwentyDays)}
                  minimumDate={new Date(TwentyDaysBack)}
                  mode="date"
                  onChange={this.setDate}
                />
              )}

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
    title: state.projectReducer.chooseNotesTitle,
    text: state.projectReducer.chooseNotesText,
  };
}
const mapDispatchToProps = {
  AddProjectDate,
  submitWorkingDay,
  AddProjectHours,
  AddProjectNoteTitle,
  AddProjectNoteText,
  submitProjectNote,
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
