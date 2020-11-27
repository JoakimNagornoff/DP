import {REQUEST_API_ENDPROJECT_DATA, RECIEVE_API_ENDPROJECT_DATA, EndProject, EndProjectActionType, REQUEST_API_ENDPROJECT_DELETE, DELETE_API_ENDPORJECT_SUCCESS, MOVED_API_ENDPROJECT_SUCCESS, FIREBASE_LISTENER_ENDPROJECT} from './types'

export const requestApiEndProjectData = () => {
    return {
        type: REQUEST_API_ENDPROJECT_DATA
    }
}

export const recieveApiEndProjectData = (data: EndProject[]) : EndProjectActionType => {
    return {
        type: RECIEVE_API_ENDPROJECT_DATA,
        payload: data
    }
}

export const requestApiEndProjectDelete = (id) => {
    return {
        type: REQUEST_API_ENDPROJECT_DELETE,
        id
    }
}
export const deleteProjectEndEDSuccess = (id) => {
    return {
      type: DELETE_API_ENDPORJECT_SUCCESS,
      payload: id
    }
  }

  export const movedEndProjectSuccess = (data) => {
      return {
          type: MOVED_API_ENDPROJECT_SUCCESS,
          payload: data
      }
  }
  export const firebaseListenerEndProject = (data) => {
      return {
          type: FIREBASE_LISTENER_ENDPROJECT,
          payload: data
      }
  }