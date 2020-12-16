import {LOGIN_USER_SUCCESS, UPDATE_PROFIL, User, UserActionTypes } from './types'
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const AuthLoginUser = (email : string, password: string) : UserActionTypes => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: async () => {
      
 
}

    }
}


export const updateProfil = (displayName) : UserActionTypes => {
    return {
        type: UPDATE_PROFIL,
        payload: async() => {
            await firebase.auth().currentUser?.updateProfile(displayName)
        }
    }
}