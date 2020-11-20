import { EndProjectState, EndProjectActionType, REQUEST_API_ENDPROJECT_DATA, RECIEVE_API_ENDPROJECT_DATA, DELETE_API_ENDPORJECT_SUCCESS, MOVED_API_ENDPROJECT_SUCCESS } from '../actions/EndsProject/types'

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
                data: action.payload
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
                  data: [...state.data, EndProject]
              }

          }
    }
    
    return state;
}

export default endProjectReducer;