import { EndProjectState, EndProjectActionType, REQUEST_API_ENDPROJECT_DATA, RECIEVE_API_ENDPROJECT_DATA, DELETE_API_ENDPORJECT_SUCCESS, MOVED_API_ENDPROJECT_SUCCESS, FIREBASE_LISTENER_ENDPROJECT } from '../actions/EndsProject/types'

const initialState : EndProjectState = {
    data: [],
    loading: false,
    error: ''
}

const endProjectReducer = (
    state = initialState,
    action: EndProjectActionType
): EndProjectState => {
    switch(action.type) {
        case REQUEST_API_ENDPROJECT_DATA: {
            return {
                ...state,
                loading: true
            }
        }
        case RECIEVE_API_ENDPROJECT_DATA: {
            return {
                ...state,
                loading: false,
                //data: action.payload
            }
        }
        case DELETE_API_ENDPORJECT_SUCCESS: {
            const EndProject = action.payload;
            return {
              ...state,
              data: state.data.filter(project => project.id !== EndProject.id)
            }
          }
          case MOVED_API_ENDPROJECT_SUCCESS: {
              const EndProject = action.payload;
              return {
                  ...state,
                 // data: [...state.data, EndProject]
              }
          }
          case FIREBASE_LISTENER_ENDPROJECT: {
              const currentEndProjectIds = state.data.map(project => project.id)

              const addEndProject = action.payload.filter(ep => ep.type === 'added').map(ep => ep.data)
              const removedEndProject = action.payload.filter(ep => ep.type === 'removed').map(ep => ep.data.id)

            const endProjectToAdd = addEndProject.filter(ep => !currentEndProjectIds.includes(ep.id))
            const endProjectArrayWithAdded = [...state.data, ...endProjectToAdd]

            const endProjectArrayWithRemoved = endProjectArrayWithAdded.filter(ep => !removedEndProject.includes(ep.id))
            
            return {
                ...state,
                data: endProjectArrayWithRemoved
            }
        }
    }
    
    return state;
}

export default endProjectReducer;