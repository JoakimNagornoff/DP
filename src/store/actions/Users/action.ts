import {LOGIN_USER_SUCCESS, User, UserActionTypes } from './types'
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { retry } from 'redux-saga/effects';


export const AuthLoginUser = (email : string, password: string) : UserActionTypes => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: async () => {
      
 
}

    }
}
