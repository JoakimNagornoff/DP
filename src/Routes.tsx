import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMidleware, { runSaga } from 'redux-saga'
import rootSaga from './store/sagas'
import { composeWithDevTools } from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist'

//screens
import HomeScreen from './screens/Home/HomeScreen';
import ProjectScreen from './screens/Projects/ProjectScreen';
import ProjectNote from './screens/ProjectNote/ProjectNote';
import LoginScreen from './screens/LoginScreen/loginScreen';
import rootReducer from './store/index';
import EndsProjects from 'screens/EndsProjects';
import FirstTimeSignIn from './screens/FirstTimeSignIn/FirstTimeSignIn'
import Home from './screens/Home/HomeTabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import { DrawerComponent, HeaderLeft, HeaderRight } from 'components/DrawMeny/DrawMeny';

import { initializeFirestoreListener, initializeFirestoreListenerEndProject, initializeFireStoreNoteListener } from 'store/firestore';
import ProfilScreen from 'screens/ProfilScreen';


const persistConig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['endProject', 'projectNote', 'Project']
}
const persistedReducer = persistReducer(persistConig, rootReducer)

interface RoutesProps {
  navigation: any
}
const Stack = createStackNavigator();


const sagaMiddleware = createSagaMidleware();
const middleWare = [sagaMiddleware];

const store = createStore(
  persistedReducer,composeWithDevTools(
  applyMiddleware(...middleWare),
))
sagaMiddleware.run(rootSaga);

const peristedStore = persistStore(store)

store.subscribe(() => {
  console.log('store state:');
  console.log(JSON.stringify(store.getState()));
});


//firebase listener for each collection Projects, Notes, EndProjects
initializeFirestoreListener(store.dispatch);
initializeFireStoreNoteListener(store.dispatch)
initializeFirestoreListenerEndProject(store.dispatch)

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={peristedStore}>
      <NavigationContainer>     
        <Stack.Navigator screenOptions={{gestureEnabled: true, gestureDirection: 'horizontal'}} initialRouteName="LogIn">
          <Stack.Screen  options={{ headerLeft: ({}) => <HeaderLeft />}}name="Home" component={DrawerComponent} />
          <Stack.Screen name="FirstTimeSignIn" component={FirstTimeSignIn}/>
          <Stack.Screen options={{  headerLeft: ({}) => <HeaderLeft />}}name="Projects" component={ProjectScreen} />
          <Stack.Screen options={{  headerLeft: ({}) => <HeaderLeft />}} name="ProjectNote" component={ProjectNote} />
          <Stack.Screen name="LogIn" component={LoginScreen} />
          <Stack.Screen options={{  headerLeft: ({}) => <HeaderLeft />}} name="EndProjects" component={EndsProjects}/>
        </Stack.Navigator>
       
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

