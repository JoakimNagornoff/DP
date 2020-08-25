import {
  PersonState,
  AUTH_LOGIN,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_REJECTED,
  AUTH_LOGOUT,
  AUTH_LOGOUT_FULFILLED,
  AUTH_LOGOUT_PENDING,
  AUTH_LOGOUT_REJECTED,
  LoginActionType,
} from '../actions/types';

const initialState: PersonState = {
  uid: '',
  email: '',
  fireBaseSucces: false,
  fireBasePending: false,
  fireBaseError: '',
};

const personReducer = (
  state = initialState,
  action: LoginActionType,
): PersonState => {
  switch (action.type) {
    case AUTH_LOGIN_PENDING:
      return {
        ...state,
        fireBasePending: true,
      };
    case AUTH_LOGIN_REJECTED:
      return {
        ...state,
        fireBaseError: 'Nåt gick fel',
        fireBasePending: false,
      };
    case AUTH_LOGIN_FULFILLED:
      return {
        ...state,
        fireBasePending: false,
        fireBaseSucces: true,
        email: action.payload.email,
        uid: action.payload.uid,
      };
    case AUTH_LOGOUT_PENDING:
      return {
        ...state,
        fireBasePending: true,
      };
    case AUTH_LOGOUT_REJECTED:
      return {
        ...state,
        fireBaseError: 'Nåt gick fel med utlogging',
        fireBasePending: false,
      };
    case AUTH_LOGOUT_FULFILLED:
      return {
        ...state,
        fireBasePending: false,
        fireBaseSucces: true,
        uid: '',
      };
  }
  return state;
};
export default personReducer;
