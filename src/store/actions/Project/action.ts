import { ADD_PROJECT_HOURS,ADD_PROJECT_DATE,REQUEST_API_PROJECT_DATA, RECIEVE_API_PROJECT_DATA, REQUEST_API_CREATE_PROJECT, Project, ProjectActionType, REQUEST_API_UPDATE_PROJECT, RECIEVE_API_UPDATE_PROJECT, FIREBASE_LISTEN_REQUESTED, FIREBASE_LISTEN_FULFILLED, REQUEST_API_PROJECT_DATA_WITH_ID, RECIEVE_API_PROJECT_DATA_WITH_ID} from './types'
import firestore, { firebase } from '@react-native-firebase/firestore';

export const requestApiProjectData = () => {
    return {
      type: REQUEST_API_PROJECT_DATA
    }
  }
  export const recieveApiProjectData = (data: Project[]) : ProjectActionType => {
    return {
      type: RECIEVE_API_PROJECT_DATA,
      payload: data
    }
  }
  export const requestApiProjectDataWithId = (id) => {
    return {
      type: REQUEST_API_PROJECT_DATA_WITH_ID,
      id
    }
  }
  export const recieveApiProjectDataWithId = (data: Project[]) : ProjectActionType => {
    return {
      type: RECIEVE_API_PROJECT_DATA_WITH_ID,
      payload: data
    }
  }
  
  export const AddNewProject = (name : string) => {
    return {
      type: REQUEST_API_CREATE_PROJECT,
      name
    }
  }

  export const updateProject = (id, hours, date) => {
    return {
      type: REQUEST_API_UPDATE_PROJECT,
      id,
      hours, 
      date
    }
  }

  export const recieveApiUpdateProjectdata =()  => {
    return {
     type: RECIEVE_API_UPDATE_PROJECT,
    }
  }

  export const AddProjectHours = (hours : number)  : ProjectActionType => {
    return {
      type: ADD_PROJECT_HOURS,
      payload: hours
    }
  }
  export const AddProjectDate = (date: string)  : ProjectActionType => {
    return {
      type: ADD_PROJECT_DATE,
      payload: date
    }
  }

export const requestFirebaseListing = ()  => {
  var list_projects = [] as any;
  return {
    type: FIREBASE_LISTEN_REQUESTED,
    payload: firestore().collection("Projects").get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
        list_projects.push(document.data())
      });
    }).then(() => {
      console.log(list_projects)
    })
    
}
}