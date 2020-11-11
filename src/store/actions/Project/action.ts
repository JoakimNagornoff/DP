import { ADD_PROJECT_HOURS,ADD_PROJECT_DATE,REQUEST_API_PROJECT_DATA, RECIEVE_API_PROJECT_DATA, REQUEST_API_CREATE_PROJECT, Project, ProjectActionType, REQUEST_API_UPDATE_PROJECT, RECIEVE_API_UPDATE_PROJECT,  REQUEST_API_PROJECT_DATA_WITH_ID, RECIEVE_API_PROJECT_DATA_WITH_ID, FIREBASE_PROJECT_LIST_LISTENER, RECIEVE_API_CREATE_PROJECT, REQUEST_API_DELETE_PROJECT, DELETE_PROJECT_SUCCESS} from './types'

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

  export const requestApiCreateProjectData = () => {
    return {
      type: REQUEST_API_CREATE_PROJECT
    }
  }
  export const recieveApiCreatedProjectData = (data) : ProjectActionType => {
    return {
      type: RECIEVE_API_CREATE_PROJECT,
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
  
  export const AddNewProject = (name) => {
    return {
      type: REQUEST_API_CREATE_PROJECT,
      name,

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

  export const recieveApiUpdateProjectdata =(data) : ProjectActionType => {
    return {
     type: RECIEVE_API_UPDATE_PROJECT,
     payload: data
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

  export const requestDeleteProject = (id)  => {
    return {
      type: REQUEST_API_DELETE_PROJECT,
      id
    }
  }
 
  export const deleteProjectSuccess = (id) => {
    return {
      type: DELETE_PROJECT_SUCCESS,
      payload: id
    }
  }