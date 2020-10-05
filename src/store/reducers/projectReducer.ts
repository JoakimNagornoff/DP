import {
  ADD_PROJECT_NAME,
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  GET_ALL_PROJECTS_FULFILLED,
  SUBMIT_NEW_PROJECT_FULFILLED,
  SUBMIT_WORKING_DAY_FULFILLED,
  ProjectActionType,
  ProjectState,
} from '../actions/types';

const initialState: ProjectState = {
  name: '',
  chooseDate: '',
  chooseHours: 0,
  projects: [],
};

const projectReducer = (
  state = initialState,
  action: ProjectActionType,
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case ADD_PROJECT_DATE:
      return {
        ...state,
        chooseDate: action.payload,
      };
    case ADD_PROJECT_HOURS:
      return {
        ...state,
        chooseHours: action.payload,
      };
    case GET_ALL_PROJECTS_FULFILLED:
      return {
        ...state,
        projects: action.payload,
      };
    case SUBMIT_NEW_PROJECT_FULFILLED:
      return {
        ...state,
        name: '',
        projects: [...state.projects, action.payload],
      };
    case SUBMIT_WORKING_DAY_FULFILLED:
      return {
        ...state,
        chooseDate: '',
        chooseHours: 0,
        projects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            return {
              ...project,
              workingDays: [
                ...(project.workingDays ? project.workingDays : []),
                {date: action.payload.date, hours: action.payload.hours},
              ],
            };
          }
          return project;
        }),
      };
  }

  return state;
};

export default projectReducer;
