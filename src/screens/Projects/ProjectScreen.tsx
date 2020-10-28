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
  AddNewProjectNote
} from 'store/actions/ProjectNotes/action'
import {updateProject, AddProjectHours, AddProjectDate} from 'store/actions/Project/action'
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import formdateDate from 'components/DatePickerModal/components/formdateDate/formatDate';
import ProjectNotes from '@components/ProjectNoteCard/ProjectNotes'

import BackButton from '@components/BackButton/BackButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TwentyDays from 'components/DatePickerModal/components/TwentyDays/TwentyDays';
import TwentyDaysBack from 'components/DatePickerModal/components/TwentyDaysBack/TwentyDaysBack';
import WorkindayList from '@components/WorkinDayList/WorkinDayList'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


interface State {
  thisProject: [];
  thisProjectNotes: any[];
  show: boolean;
  datepickerOpen: boolean;
  addNoteShow: boolean;
  test: string;
  title: string;
  text: string;

}

class ProjectScreen extends Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      thisProject: [],
      thisProjectNotes: [],
      show: false,
      datepickerOpen: false,
      addNoteShow: false,
      test: '',
      title: '',
      text: '',
      

    };
  }
  _onChange = form => console.log(form);
  setDate = (event, date) => {
    this.setState({datepickerOpen: false});
    if (!!date) {
     // this.props.Add(formdateDate({chooseDate}))
    this.props.AddProjectDate(formdateDate(date))
    //console.log(formdateDate(date))
 
     
    }
  };

  //Submit WorkingDay method

  //Submit project note method
  openDatePicker () {
    this.setState({
      datepickerOpen: true
    })
  }
 

  closeShow() {
    this.setState({
      show: false,
    });

  }
  CloseNoteShow() {
    this.setState({
      addNoteShow: false,
    });
  }
  create() {
    const {title, text} = this.state
    const projectId = this.props.project?.id    
    this.props.AddNewProjectNote({projectId},{title}, {text})
    this.setState({addNoteShow: false})
  }
  test() {
    const {test} = this.state
    const {date, hours} = this.props
    const id = this.props.project?.id
    this.props.updateProject({id},{hours},{date})
    this.setState({show: false})

  }

  render() {
    const {navigate} = this.props.navigation;
    if (!this.props.project) {
      return <Text>Error loading project</Text>;
    }
    const {name, id} = this.props.route.params;
    return (
      <View style={style.container}>

      <TouchableOpacity onPress={() => {
        this.setState({addNoteShow: true})}}><Text>ADD</Text></TouchableOpacity>
      <View style={style.topMiddleView}>
      <Text>Project Notes</Text>
      <ProjectNotes navigation={this.props.navigation}  route={this.props.route}/>
      </View>
      <View style={style.topMiddleView}>
      <Text>Arbetsdagar</Text>
      <WorkindayList  route={this.props.route} />
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
        <Modal transparent={true} visible={this.state.addNoteShow}>
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
              this.CloseNoteShow();
            }}
          />
          <Text style={style.headerTitle}>{ProjectNotes.name}</Text>
          <TextInput
                style={style.input}
                placeholder="title"
                value={this.state.title}
                onChangeText={(text) => this.setState({title: text})}
              />
               <TextInput
                style={style.input}
                placeholder="Text"
                value={this.state.text}
                onChangeText={(text) => this.setState({text: text})}
              />

          <TouchableOpacity
            onPress={() => {this.create()}}
            style={style.addSubmitButtonFireBase}>
            <Text style={style.textAddButton}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
          <TextInput
                style={style.input}
                placeholder="Timmar"
                keyboardType="numeric"
                onChangeText={this.props.AddProjectHours}
              />
          <Button
            title={this.props.date || 'Datum'}
            onPress={() => {
              this.setState({datepickerOpen: true});
            }}
          />

          {this.state.datepickerOpen && (
            <RNDateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={
              this.props.hours ? new Date(this.props.hours) : new Date()
            }
            maximumDate={new Date(TwentyDays)}
            minimumDate={new Date(TwentyDaysBack)}
            mode="date"
            onChange={this.setDate}
          />
          ) }

          <TouchableOpacity
            onPress={() => {this.test()}}
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
/*<TextInput
            style={style.input}
            placeholder="Timmar"
            keyboardType="numeric"
            onChangeText={this.props.AddProjectHours}
          />
          <Button
            title={ 'Datum'}
            onPress={() => {
              this.setState({datepickerOpen: true});
            }}
          />

          {this.state.datepickerOpen && (
            <RNDateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={
              this.state.chooseDate ? new Date(this.state.chooseDate) : new Date()
            }
            maximumDate={new Date(TwentyDays)}
            minimumDate={new Date(TwentyDaysBack)}
            mode="date"
            onChange={this.setDate}
          />
          ) }*/

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    project: state.project.data.find(project => project.id === props.route.params.id),
    hours: state.project.chooseHours,
    date: state.project.chooseDate
  };
}
const mapDispatchToProps = {
  AddNewProjectNote,
  updateProject,
  AddProjectDate,
  AddProjectHours


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
    flex: 1,
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
  endProjectModalText: {
    fontSize: 24,
    textAlign: 'center'
  },
  continue: {
    marginTop: 40,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 1,
    width: 200,
  },
  continueText: {
    fontSize: 18,
    textAlign: 'center'
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 60,
    width: 360,
  },
});

export default connector(ProjectScreen);
