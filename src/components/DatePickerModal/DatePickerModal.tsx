import React, {Component} from 'react';
import {View, StyleSheet, UIManager, Platform} from 'react-native';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';

import RNDateTimePicker from '@react-native-community/datetimepicker';
import {AddProjectDate} from 'store/actions/action';
import formdateDate from 'components/DatePickerModal/components/formdateDate';

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

interface State {
  show: boolean;
  datepickerOpen: boolean;
}

class DatePickerModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      datepickerOpen: false,
    };
  }
  _onChange = form => console.log(form);
  setDate = (event, date) => {
    this.setState({datepickerOpen: false});
    if (date) {
      this.props.AddProjectDate(formdateDate(date));
    }
  };
  closeShow() {
    this.setState({
      show: false,
    });
  }
  render() {
    return (
      <View>
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
      </View>
    );
  }
}

function mapStateToProps(state: RootState, props: OwnProps) {
  return {
    store: state,
    chooseDate: state.projectReducer.chooseDate,
  };
}
const mapDispatchToProps = {
  AddProjectDate,
};
const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = {};
type Props = PropsFromRedux & OwnProps;
const style = StyleSheet.create({
  headerTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default connector(DatePickerModal);
