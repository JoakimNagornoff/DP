import formdateDate from 'components/DatePickerModal/components/formdateDate';
import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from 'store';


function Item({date, hours, worker}) {
    return (
        <View style={style.projectItem}>
          <Text>{formdateDate(date)}</Text>
          <Text>timmar: {hours}</Text>
          <Text>{worker}</Text>
        </View>
    )
}

class WorkinDayList extends Component<Props> {
    render() {
        return (
            <View style={style.container}>
              <FlatList
                data={this.props.project?.project.workingDays}
                renderItem={({item}) => (
                  <Item date={item.date} hours={item.hours} worker={item.worker} />
                )}
                keyExtractor={item => item.date.toString() + item.hours }
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
      project: state.project.data.find(
    project => project.id === props.route.params.id,
      ),
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
      flex: 1,
    },
    projectItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        height: 80,
        width: 360,
      },
  })

  export default connector(WorkinDayList);