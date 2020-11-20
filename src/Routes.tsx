import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
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
import Home from './screens/Home/HomeTabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const persistConig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['project', 'endProject']
}
const persistedReducer = persistReducer(persistConig, rootReducer)



interface RoutesProps {
  navigation: any
}
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


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



//Drawer meny
const DrawerComponent = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
     name="Home" component={Home}></Drawer.Screen>
    </Drawer.Navigator>
  )
}

//button for HeaderLeft open Draw Meny
const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity style={{padding: 10}}
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}>
        <Icon name="bars" size={30} color={"#000000"}/>
    </TouchableOpacity>
  </View>
  )
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={peristedStore}>
      <NavigationContainer>     
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen  options={{
            headerLeft: ({}) => <HeaderLeft />
          }} name="Home" component={DrawerComponent} />
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

