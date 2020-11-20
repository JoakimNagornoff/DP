import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RootState } from 'store';
import {connect, ConnectedProps} from 'react-redux';
import ActivityIndicatorExample from 'components/ActivityIndicatorExample';
import EndProjectList from 'components/EndProjectList';
import {requestApiEndProjectData} from 'store/actions/EndsProject/action'

class EndsProjects extends Component<Props> {
    render() {
        return(
            <View style={style.container}>
                {this.props.loading && (
                    <ActivityIndicatorExample></ActivityIndicatorExample>
                )}
                <EndProjectList navigation={this.props.navigation}></EndProjectList>
                </View>
        )
    }
}

function mapStateToProps(state: RootState, props: OwnProps) {
    return {
        store: state,
        loading: state.endProject.loading,
        endProject: state.endProject.data

    }
}
const mapDispatchToProps = {

    requestApiEndProjectData

};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = {
    navigation: any;
    route: any;
}

type Props = PropsFromRedux & OwnProps;

const style= StyleSheet.create({
    container: {
        flex: 1
    }
})
export default connector(EndsProjects);