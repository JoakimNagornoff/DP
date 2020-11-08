export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const FETCH_USER_DATA = 'FETCH_USER_DATA';


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

  export type UserActionTypes =  loginUserSuccessAction | loginUserFailedAction | fetchUserDataAction 


