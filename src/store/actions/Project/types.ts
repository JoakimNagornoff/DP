export const REQUEST_API_PROJECT_DATA = 'REQUEST_API_PROJECT_DATA';
export const RECIEVE_API_PROJECT_DATA = 'RECIEVE_API_PROJECT_DATA';

export const REQUEST_API_PROJECT_DATA_WITH_ID = 'REQUEST_API_PROJECT_DATA_WITH_ID';
export const RECIEVE_API_PROJECT_DATA_WITH_ID = 'RECIEVE_API_PROJECT_DATA_WITH_ID'

export const REQUEST_API_CREATE_PROJECT = 'REQUEST_API_CREATE_PROJECT';
export const RECIEVE_API_CREATE_PROJECT = 'RECIEVE_API_CREATE_PROJECT';

export const REQUEST_API_UPDATE_PROJECT = 'REQUEST_API_UPDATE_PROJECT';
export const RECIEVE_API_UPDATE_PROJECT = 'RECIEVE_API_UPDATE_PROJECT';

export const FIREBASE_LISTEN_REQUESTED = 'FIREBASE_LISTEN_REQUESTED';
export const FIREBASE_LISTEN_FULFILLED = 'FIREBASE_LISTEN_FULFILLED'

export const ADD_PROJECT_DATE = 'ADD_PROJECT_DATE';
export const ADD_PROJECT_HOURS = 'ADD_PROJECT_HOURS'

export interface Project {
    id: string;
    project : {
      name: string;
      workingDays: {
        date: string;
        hours: number;
      }[];
    }
   
  }
  
  export interface ProjectState {
    chooseDate: string;
    chooseHours: number;
    data: Project[];
    loading: boolean;
    error: string;
  }


  interface requestApiProjectDataWithIdAction {
    type: typeof REQUEST_API_PROJECT_DATA_WITH_ID
  }
interface recieveApiProjectDataWithIdAction {
  type: typeof RECIEVE_API_PROJECT_DATA_WITH_ID
  payload: any
}
  
interface recieveApiProjectDataAction {
    type: typeof RECIEVE_API_PROJECT_DATA;
    payload: Project[];
  }
  interface RequestApiProjectDataAction {
    type: typeof REQUEST_API_PROJECT_DATA;
  }
  interface requestApiProjectDataAction {
    type: typeof REQUEST_API_UPDATE_PROJECT;
  }
  
  interface recieveApiUpdateProjectdataAction {
    type: typeof RECIEVE_API_UPDATE_PROJECT;
    payload: Project[];
  }
  interface AddProjectDateAction {
    type: typeof ADD_PROJECT_DATE;
    payload: string;
  }
  interface AddProjectHourAction {
    type: typeof ADD_PROJECT_HOURS;
    payload: number;
  }
  interface firebaseListingRequestAction {
    type: typeof FIREBASE_LISTEN_REQUESTED;
    payload: any;
  }
  interface firebaseListingFulfilledAction {
    type: typeof FIREBASE_LISTEN_FULFILLED;
    payload: any[]
  }

  export type ProjectActionType =
   RequestApiProjectDataAction
  | recieveApiProjectDataAction |recieveApiUpdateProjectdataAction | requestApiProjectDataAction | AddProjectDateAction | AddProjectHourAction | firebaseListingRequestAction | firebaseListingFulfilledAction | requestApiProjectDataWithIdAction | recieveApiProjectDataWithIdAction