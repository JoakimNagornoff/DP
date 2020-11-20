import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppParamsList} from 'AppParamsList'

import HomeScreen from 'screens/Home'
import EndProjectScreen from 'screens/EndsProjects'

interface AppTabsProps {}

const Tabs = createMaterialTopTabNavigator<AppParamsList>();

export const AppTabs : React.FC<AppTabsProps> = ({}) => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen options={{ }} name="Home" component={HomeScreen}/>
            <Tabs.Screen name="EndProjects" component={EndProjectScreen}/>
        </Tabs.Navigator>
    )
}