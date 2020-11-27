import { firebase } from '@react-native-firebase/firestore';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from 'screens/Home/HomeTabs';

const Drawer = createDrawerNavigator();


export const DrawerComponent = () => {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen 
       name="Home" component={Home}></Drawer.Screen>
      </Drawer.Navigator>
    )
  }

  
  //button for HeaderLeft open Draw Meny
 export const HeaderLeft = () => {
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

  export const HeaderRight = () => {
      const navigation = useNavigation()
      return (
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{padding: 10}}
          onPress={() => {
            navigation.goBack()
          }}>
            <Icon name="arrow-left" size={24} color={"#000000"}/>
        </TouchableOpacity>
      </View>
      )
  }
  

  export function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
          <DrawerItem label="user" onPress={() => (console.log("user"))}></DrawerItem> 
        <DrawerItemList {...props} />
        
        <DrawerItem 
       icon={() => <Icon name="rocket" size={30} color={"#000000"}/> }
       label="Logga ut"
        onPress={() => SignOut()} />
     
      </DrawerContentScrollView>
    );
  }
  

  const SignOut= () => {
      firebase.auth().signOut()
  }