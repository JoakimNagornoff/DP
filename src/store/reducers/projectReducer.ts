import {
  ADD_PROJECT_NAME,
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  GET_ALL_PROJECTS_FULFILLED,
  SUBMIT_NEW_PROJECT_FULFILLED,
  SUBMIT_WORKING_DAY_FULFILLED,
  ADD_PROJECT_NOTE_TEXT,
  ADD_PROJECT_NOTE_TITLE,
  SUBMIT_NEW_NOTE_FULFILLED,
  ProjectActionType,
  ProjectState,
  SUBMIT_PROJECT_NOTE_FULFILLED,
  SUBMIT_EDIT_PROJECT_NOTE_FULFILLED,
} from '../actions/types';

const initialState: ProjectState = {
  name: '',
  chooseDate: '',
  chooseHours: 0,
  chooseNotesTitle: '',
  chooseNotesText: '',

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
    case ADD_PROJECT_NOTE_TITLE:
      return {
        ...state,
        chooseNotesTitle: action.payload,
      };
    case ADD_PROJECT_NOTE_TEXT:
      return {
        ...state,
        chooseNotesText: action.payload,
      };
    case SUBMIT_PROJECT_NOTE_FULFILLED:
      return {
        ...state,
        chooseNotesTitle: '',
        chooseNotesText: '',
        projects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            return {
              ...project,
              projectNotes: [
                ...(project.projectNotes ? project.projectNotes : []),
                {title: action.payload.title, text: action.payload.text},
              ],
            };
          }
          return project;
        }),
      };
    case SUBMIT_EDIT_PROJECT_NOTE_FULFILLED:
      return {
        ...state,
        chooseNotesTitle: '',
        chooseNotesText: '',
        projects: state.projects.map(project => {
          if (project.id === action.payload.id) {
            return {
              ...project,
              projectNotes: [
                ...(project.projectNotes ? project.projectNotes : []),
                {title: action.payload.title, text: action.payload.text},
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
