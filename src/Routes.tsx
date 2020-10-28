import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMidleware, { runSaga } from 'redux-saga'
import rootSaga from './store/sagas'

//screens
import HomeScreen from './screens/Home/HomeScreen';
import ProjectScreen from './screens/Projects/ProjectScreen';
import ViewNotes from './screens/ViewNotes/ViewNotes';
import AddNotes from './screens/AddNotes/AddNotes';
import ProjectNote from './screens/ProjectNote/ProjectNote';
import LoginScreen from './screens/LoginScreen/loginScreen';
import rootReducer from './store/index';




interface RoutesProps {}
const Stack = createStackNavigator();

const sagaMiddleware = createSagaMidleware();
const middleWare = [sagaMiddleware];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleWare)
)
sagaMiddleware.run(rootSaga);


store.subscribe(() => {
  console.log('store state:');
  console.log(JSON.stringify(store.getState()));
});



export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Projects" component={ProjectScreen} />
          <Stack.Screen name="Notes" component={ViewNotes} />
          <Stack.Screen name="AddNotes" component={AddNotes} />
          <Stack.Screen name="ProjectNote" component={ProjectNote} />
          <Stack.Screen name="LogIn" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
