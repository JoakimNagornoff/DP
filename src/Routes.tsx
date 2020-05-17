import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './screens/Home/HomeScreen';
import ProjectScreen from './screens/Projects/ProjectScreen';

interface RoutesProps {}
const Stack = createStackNavigator();

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Projects" component={ProjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
