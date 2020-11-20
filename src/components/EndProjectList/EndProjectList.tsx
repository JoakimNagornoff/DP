import React, { Component } from 'react'
import {  View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from 'store';
import {requestApiEndProjectData, requestApiEndProjectDelete} from 'store/actions/EndsProject/action';


const SCREEN_WIDTH = Dimensions.get('window').width;

    const Item = (props)  => {
        const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
              <View style={style.deleteBox}>
                <Animated.Text style={{transform: [{scale: scale}]}}>
                  Delete
                </Animated.Text>
              </View>
              </TouchableOpacity>
          );
        };
            return (
            <Swipeable renderLeftActions={leftSwipe}>
                <View style={style.projectItem}>
                <Text>{props.name}</Text>
                <Text>{props.id}</Text>
                
                </View>
            </Swipeable>
            );
      };
    

class EndProjectList extends Component<Props> {
    handleRefresh() {
        this.props.requestApiEndProjectData()
    }
    deleteItem = (id) => {
       this.props.requestApiEndProjectDelete({id})
        
      };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={style.container}>
            <FlatList 
            data={this.props.endProjects}
            onRefresh={() => this.handleRefresh()}
             refreshing={false}
                renderItem={({item, index}) => (
                    <Item name={item.endProject.project.name} id={item.id} handleDelete={() => this.deleteItem(item.id)}></Item>
                )}
                ItemSeparatorComponent={() => {
                    return <View style={style.seperatorLine}></View>;
                  }}
                keyExtractor={item => item.id}></FlatList>
            </View>
        )
    }
}
function mapStateToProps(state: ApplicationState, props: OwnProps) {
    return {
        store: state,
        loading: state.endProject.loading,
        endProjects: state.endProject.data
       }
}
const mapDispatchToProps = {
    requestApiEndProjectData,
    requestApiEndProjectDelete
}

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type OwnProps = {
    navigation: any;
    route: any
}
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
        height: 80,
        width: 360,
      },
      seperatorLine: {
        height: 1,
        backgroundColor: 'black',
      },
      deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 80,
      },
})

export default connector(EndProjectList)


