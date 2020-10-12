//project types & add to firebase
export const ADD_PROJECT_NAME = 'ADD_PROJECT_NAME';
export const ADD_PROJECT_DATE = 'ADD_PROJECT_DATE';
export const ADD_PROJECT_HOURS = 'ADD_PROJECT_HOURS';
export const ADD_PROJECT_ID = 'ADD_PROJECT_ID';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_ALL_PROJECTS_PENDING = 'GET_ALL_PROJECTS_PENDING';
export const GET_ALL_PROJECTS_REJECTED = 'GET_ALL_PROJECTS_REJECTED';
export const GET_ALL_PROJECTS_FULFILLED = 'GET_ALL_PROJECTS_FULFILLED';
export const SUBMIT_NEW_PROJECT = 'SUBMIT_NEW_PROJECT';
export const SUBMIT_NEW_PROJECT_PENDING = 'SUBMIT_NEW_PROJECT_PENDING';
export const SUBMIT_NEW_PROJECT_FULFILLED = 'SUBMIT_NEW_PROJECT_FULFILLED';
export const SUBMIT_NEW_PROJECT_REJECTED = 'SUBMIT_NEW_PROJECT_REJECTED';

//submit workin days types
export const SUBMIT_WORKING_DAY = 'SUBMIT_WORKING_DAY';
export const SUBMIT_WORKING_DAY_PENDING = 'SUBMIT_WORKING_DAY_PENDING';
export const SUBMIT_WORKING_DAY_REJECTED = 'SUBMIT_WORKING_DAY_REJECTED';
export const SUBMIT_WORKING_DAY_FULFILLED = 'SUBMIT_WORKING_DAY_FULFILLED';

//add project notes types & add to firebase
export const ADD_NOTES_TITLE = 'ADD_NOTES_TITLE';
export const ADD_NOTES_TEXT = 'ADD_NOTES_TEXT';
export const EDIT_NOTES_TITLE = 'EDIT_NOTES_TITLE';
export const EDIT_NOTES_TEXT = 'EDIT_NOTES_TEXT';
export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const GET_ALL_NOTES_FULFILLED = 'GET_ALL_NOTES_FULFILLED';
export const GET_ALL_NOTES_PENDING = 'GET_ALL_NOTES_PENDING';
export const GET_ALL_NOTES_REJECTED = 'GET_ALL_NOTES_REJECTED';
export const SUBMIT_NEW_NOTE = 'SUBMIT_NEW_NOTE';
export const SUBMIT_NEW_NOTE_FULFILLED = 'SUBMIT_NEW_NOTE_FULFILLED';
export const SUBMIT_NEW_NOTE_PENDING = 'SUBMIT_NEW_NOTE_PENDING';
export const SUBMIT_NEW_NOTE_REJECTED = 'SUBMIT_NEW_NOTE_REJECTED';
export const SUBMIT_NEW_EDIT_NOTE = 'SUBMIT_NEW_EDIT_NOTE';
export const SUBMIT_NEW_EDIT_NOTE_FULFILLED = 'SUBMIT_NEW_EDIT_NOTE_FULFILLED';
export const SUBMIT_NEW_EDIT_NOTE_PENDING = 'SUBMIT_NEW_EDIT_NOTE_PENDING';
export const SUBMIT_NEW_EDIT_NOTE_REJECTED = 'SUBMIT_NEW_EDIT_NOTE_REJECTED';

//login types
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_PENDING = 'AUTH_LOGIN_PENDING';
export const AUTH_LOGIN_REJECTED = 'AUTH_LOGIN_REJECTED';
export const AUTH_LOGIN_FULFILLED = 'AUTH_LOGIN_FULFILLED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGOUT_PENDING = 'AUTH_LOGOUT_PENDING';
export const AUTH_LOGOUT_REJECTED = 'AUTH_LOGOUT_REJECTED';
export const AUTH_LOGOUT_FULFILLED = 'AUTH_LOGOUT_FULFILLED';

interface Project {
  id: string;
  name: string;
  workingDays: {
    date: string;
    hours: number;
  }[];
}

export interface ProjectState {
  name: string;
  chooseDate: string;
  chooseHours: number;

  projects: Project[];
}

interface GetAllProjectsAction {
  type: typeof GET_ALL_PROJECTS;
  payload: any;
}

interface GetAllProjectsPendingAction {
  type: typeof GET_ALL_PROJECTS_PENDING;
  payload: any;
}

interface GetAllProjectsRejectedAction {
  type: typeof GET_ALL_PROJECTS_REJECTED;
  payload: any;
}

interface GetAllProjectsFulfilledAction {
  type: typeof GET_ALL_PROJECTS_FULFILLED;
  payload: Project[];
}

interface AddProjectNameAction {
  type: typeof ADD_PROJECT_NAME;
  payload: string;
}

interface AddProjectDateAction {
  type: typeof ADD_PROJECT_DATE;
  payload: string;
}
interface AddProjectHourAction {
  type: typeof ADD_PROJECT_HOURS;
  payload: number;
}
interface SubmitNewProjectAction {
  type: typeof SUBMIT_NEW_PROJECT;
  payload: any;
}
interface SubmitNewProjectPendingAction {
  type: typeof SUBMIT_NEW_PROJECT_PENDING;
  payload: any;
}
interface SubmitNewProjectRejectedAction {
  type: typeof SUBMIT_NEW_PROJECT_REJECTED;
  payload: any;
}
interface SubmitNewProjectFulfilledAction {
  type: typeof SUBMIT_NEW_PROJECT_FULFILLED;
  payload: Project;
}
interface SubmitWorkingDayAction {
  type: typeof SUBMIT_WORKING_DAY;
  payload: any;
}
interface SubmitWorkingDayPendingAction {
  type: typeof SUBMIT_WORKING_DAY_PENDING;
  payload: any;
}
interface SubmitWorkingDayRejectedAction {
  type: typeof SUBMIT_WORKING_DAY_REJECTED;
  payload: any;
}
interface SubmitWorkingDayFulfilledAction {
  type: typeof SUBMIT_WORKING_DAY_FULFILLED;
  payload: {
    id: string;
    date: string;
    hours: number;
  };
}

export type ProjectActionType =
  | AddProjectNameAction
  | AddProjectDateAction
  | AddProjectHourAction
  | GetAllProjectsAction
  | GetAllProjectsFulfilledAction
  | GetAllProjectsPendingAction
  | GetAllProjectsRejectedAction
  | SubmitNewProjectFulfilledAction
  | SubmitNewProjectAction
  | SubmitNewProjectRejectedAction
  | SubmitNewProjectPendingAction
  | SubmitWorkingDayAction
  | SubmitWorkingDayPendingAction
  | SubmitWorkingDayRejectedAction
  | SubmitWorkingDayFulfilledAction;

interface Note {
  projectId: string;
  title: string;
  text: string;
  createdAt: string
  id: string;
}

export interface NoteState {
  title: string;
  text: string;
  projectId: string;
  id: string;
  createdAt: string
  notes: Note[];
}

interface AddNotesTitleAction {
  type: typeof ADD_NOTES_TITLE;
  payload: string;
}
interface AddNotesTextAction {
  type: typeof ADD_NOTES_TEXT;
  payload: string;
}
interface EditNotesTitleAction {
  type: typeof EDIT_NOTES_TITLE;
  payload: string;
}
interface EditNotesTextAction {
  type: typeof EDIT_NOTES_TEXT;
  payload: string;
}
interface GetAllNotesAction {
  type: typeof GET_ALL_NOTES;
  payload: any;
}

interface GetAllNotesFulfilledAction {
  type: typeof GET_ALL_NOTES_FULFILLED;
  payload: Note[];
}
interface GetAllNotesPendingAction {
  type: typeof GET_ALL_NOTES_PENDING;
  payload: any;
}
interface GetAllNotesRejectedAction {
  type: typeof GET_ALL_NOTES_REJECTED;
  payload: any;
}
interface SubmitNewNoteAction {
  type: typeof SUBMIT_NEW_NOTE;
  payload: any;
}
interface SubmitNewNoteFulfilledAction {
  type: typeof SUBMIT_NEW_NOTE_FULFILLED;
  payload: Note;
}
interface SubmitNewNotePendingAction {
  type: typeof SUBMIT_NEW_NOTE_PENDING;
  payload: any;
}
interface SubmitNewNoteRejectedAction {
  type: typeof SUBMIT_NEW_NOTE_REJECTED;
  payload: any;
}
interface SubmitNewEditNoteActon {
  type: typeof SUBMIT_NEW_EDIT_NOTE;
  payload: any;
}
interface SubmitNewEditNoteFulFilledAction {
  type: typeof SUBMIT_NEW_EDIT_NOTE_FULFILLED;
  payload: any;
}
interface SubmitNewEditNotePendingAction {
  type: typeof SUBMIT_NEW_EDIT_NOTE_PENDING;
  payload: any;
}
interface SubmitNewEditNoteRejectedAction {
  type: typeof SUBMIT_NEW_EDIT_NOTE_REJECTED;
  payload: any;
}

export type NotesActionType =
  | AddNotesTitleAction
  | AddNotesTextAction
  | GetAllNotesAction
  | GetAllNotesFulfilledAction
  | GetAllNotesPendingAction
  | GetAllNotesRejectedAction
  | SubmitNewNoteAction
  | SubmitNewNoteFulfilledAction
  | SubmitNewNotePendingAction
  | SubmitNewNoteRejectedAction
  | EditNotesTitleAction
  | EditNotesTextAction
  | SubmitNewEditNoteActon
  | SubmitNewEditNoteFulFilledAction
  | SubmitNewEditNotePendingAction
  | SubmitNewEditNoteRejectedAction;

export interface PersonState {
  uid: string;
  email: string;
  fireBasePending: boolean;
  fireBaseSucces: boolean;
  fireBaseError: string;
}
interface AuthLogin {
  type: typeof AUTH_LOGIN;
  payload: any;
}
interface AuthLoginFulfilled {
  type: typeof AUTH_LOGIN_FULFILLED;
  payload: any;
}
interface AuthLoginRejected {
  type: typeof AUTH_LOGIN_REJECTED;
  payload: any;
}
interface AuthLoginPending {
  type: typeof AUTH_LOGIN_PENDING;
  payload: any;
}
interface AuthLogout {
  type: typeof AUTH_LOGOUT;
  payload: any;
}
interface AuthLogoutFulfilled {
  type: typeof AUTH_LOGOUT_FULFILLED;
  payload: any;
}
interface AuthLogoutRejected {
  type: typeof AUTH_LOGOUT_REJECTED;
  payload: any;
}
interface AuthLogoutPending {
  type: typeof AUTH_LOGOUT_PENDING;
  payload: any;
}

export type LoginActionType =
  | AuthLogin
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLoginPending
  | AuthLogout
  | AuthLogoutFulfilled
  | AuthLogoutPending
  | AuthLogoutRejected;
