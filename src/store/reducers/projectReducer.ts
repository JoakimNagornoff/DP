import {
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  ProjectActionType,
  ProjectState,
  RECIEVE_API_PROJECT_DATA,
  REQUEST_API_PROJECT_DATA,
  REQUEST_API_UPDATE_PROJECT,
  RECIEVE_API_UPDATE_PROJECT,

  REQUEST_API_PROJECT_DATA_WITH_ID,
  RECIEVE_API_PROJECT_DATA_WITH_ID
} from '../actions/Project/types';

const initialState: ProjectState = {
  data: [],
  loading: false,
  error: '',
  chooseDate: '',
  chooseHours: 0,
};
const projectReducer = (
  state = initialState,
  action: ProjectActionType,
): ProjectState => {
  switch (action.type) {
    case REQUEST_API_PROJECT_DATA:{
      return {
        ...state,
        loading: true,
      }
    }
      case RECIEVE_API_PROJECT_DATA: {
        return {
          ...state,
          loading: false, 
          data: action.payload
        }
      }
        case RECIEVE_API_PROJECT_DATA: {
          return {
            ...state,
            loading: false,
            error: 'error',
            
          }
        }
        case REQUEST_API_PROJECT_DATA_WITH_ID: {
          return {
            ...state,
            loading: true
          }
        }
        case RECIEVE_API_PROJECT_DATA_WITH_ID: {
          return {
            ...state,
            loading: false,
            data: [...action.payload]
          }
        }
        case REQUEST_API_UPDATE_PROJECT: {
        return {
          ...state,
          chooseDate: '',
          chooseHours: 0, 
        }
      }
        case ADD_PROJECT_DATE: {
          return {
            ...state,
            chooseDate: action.payload
          }
        }
          case ADD_PROJECT_HOURS: {
            return {
              ...state,
              chooseHours: action.payload
            }
          }
            case RECIEVE_API_UPDATE_PROJECT: {
              return {
                ...state,
                data: action.payload,
              }
          }
        
      }
      return state;
}
  

export default projectReducer;
