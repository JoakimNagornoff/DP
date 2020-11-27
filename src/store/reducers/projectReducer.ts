import {
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  ProjectActionType,
  ProjectState,
  RECIEVE_API_PROJECT_DATA,
  REQUEST_API_PROJECT_DATA,
  REQUEST_API_UPDATE_PROJECT,
  RECIEVE_API_UPDATE_PROJECT,
  REQUEST_API_CREATE_PROJECT,
  RECIEVE_API_CREATE_PROJECT,
  REQUEST_API_PROJECT_DATA_WITH_ID,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_END_SUCCESS,
  FIREBASE_LISTENER,
  FIREBASE_LISTENER_MODIFIED
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
        case REQUEST_API_CREATE_PROJECT: {
          return {
            ...state,
            loading: true
          }
        }
        case RECIEVE_API_CREATE_PROJECT: {
          const newProject = action.payload;
          console.log('recieve_create')
          return {
            ...state,
            loading: false,
            //data : [...state.data,newProject]
    
          }
          
        }
        case REQUEST_API_PROJECT_DATA_WITH_ID: {
          return {
            ...state,
            loading: true
          }
        }

        case FIREBASE_LISTENER: {
          //mappar current projects id 
          const currentProjectIds = state.data.map(project => project.id);
          // add, modified, removed
          const addProjects = action.payload.filter(p => p.type === 'added').map(p => p.data)
          const modifiedProjects = action.payload.filter(p => p.type === 'modified').map(p => p.data)
          const removedProjects = action.payload.filter(p => p.type === 'removed').map(p => p.data.id)
          //add project to array if id isnt includes in currentProjectsId
          const projectsToAdd = addProjects.filter(p => !currentProjectIds.includes(p.id))
          const projectArrayWithAdded = [...state.data, ...projectsToAdd]

          //modified project
          const projectArrayWithModified = projectArrayWithAdded.map(project => {
            const modifiedProject = modifiedProjects.find(p => p.id === project.id)
            if(modifiedProject) {
              return modifiedProject
            }
            return project
          })
          //removed project
          const projectArrayWithRemoved = projectArrayWithModified.filter(p => !removedProjects.includes(p.id))
          
          return {
            ...state,
            data: projectArrayWithRemoved
          }

        }
        case FIREBASE_LISTENER_MODIFIED: {
          const modified = action.payload
          return {
            ...state,
            data : state.data.map(project => (
              project.id === modified.id ? modified : project
            ))
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
              const workinDay = action.payload;
              return {
                ...state,
                data: state.data.map(project => (
                  project.id === workinDay.id ? workinDay : project
                )),
              }
          }
          case DELETE_PROJECT_SUCCESS: {
            const deletedProject = action.payload;
            return {
              ...state,
              data: state.data.filter(project => project.id !== deletedProject.id)
            }
          }
          case DELETE_PROJECT_END_SUCCESS: {
            const EndProject = action.payload;
            return {
              ...state,
              data: state.data.filter(project => project.id !== EndProject.id)
            }
          }        
      }
      return state;
     
}
  

export default projectReducer;
