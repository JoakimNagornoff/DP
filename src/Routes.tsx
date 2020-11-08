import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMidleware, { runSaga } from 'redux-saga'
import rootSaga from './store/sagas'
import { composeWithDevTools } from 'redux-devtools-extension';


//screens
import HomeScreen from './screens/Home/HomeScreen';
import ProjectScreen from './screens/Projects/ProjectScreen';
import ProjectNote from './screens/ProjectNote/ProjectNote';
import LoginScreen from './screens/LoginScreen/loginScreen';
import rootReducer from './store/index';




interface RoutesProps {}
const Stack = createStackNavigator();

const sagaMiddleware = createSagaMidleware();
const middleWare = [sagaMiddleware];

const store = createStore(
  rootReducer,composeWithDevTools(
  applyMiddleware(...middleWare),
  
))
sagaMiddleware.run(rootSaga);


store.subscribe(() => {
  console.log('store state:');
  console.log(JSON.stringify(store.getState()));
});



export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Projects" component={ProjectScreen} />
          <Stack.Screen name="ProjectNote" component={ProjectNote} />
          <Stack.Screen name="LogIn" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
