import React, {Component} from 'react';
import { Button, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native'
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import BackButton from 'components/BackButton/BackButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import TwentyDays from 'components/DatePickerModal/components/TwentyDays/TwentyDays';
import TwentyDaysBack from 'components/DatePickerModal/components/TwentyDaysBack/TwentyDaysBack';
import formdateDate from 'components/DatePickerModal/components/formdateDate';
import {updateProject, AddProjectHours, AddProjectDate} from 'store/actions/Project/action'


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

interface State {
    datepickerOpen: boolean;
    show: boolean;
}
class WorkinDayModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            datepickerOpen: false,
    }
    }
    closeShow() {
      this.setState({
        show: false,
      });
  
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
    test() {
        const {date, hours} = this.props
        const id = this.props.project?.id
        this.props.updateProject({id},{hours},{date})
        this.setState({show: false})
      }
  
    render() {
        return (
    
        <Modal transparent={true}>
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
      }}></BackButton>

          <Text style={style.headerTitle}>{this.props.project?.project.name}</Text>
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
        )
    }
}

function mapStateToProps(state: RootState, props: OwnProps) {
    return {
      project: state.project.data.find(project => project.id === props.route.params.id),
      hours: state.project.chooseHours,
      date: state.project.chooseDate
    };
  }
  const mapDispatchToProps = {
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
      }

  })


  export default connector(WorkinDayModal);