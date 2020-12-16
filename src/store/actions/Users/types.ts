export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const FETCH_USER_DATA = 'FETCH_USER_DATA';

export const UPDATE_PROFIL = 'UPDATE_PROFIL';


export interface User {
    currentUser: []
}

export interface UserState {
    data: User []
}
interface loginUserSuccessAction {
    type: typeof LOGIN_USER_SUCCESS;
    payload: any
}
interface loginUserFailedAction {
    type: typeof LOGIN_USER_FAILED;
}
interface fetchUserDataAction {
    type: typeof FETCH_USER_DATA;
    payload: User []
}
interface updateProfilAction {
    type: typeof UPDATE_PROFIL;
    payload: any
}

  export type UserActionTypes =  loginUserSuccessAction | loginUserFailedAction | fetchUserDataAction | updateProfilAction


