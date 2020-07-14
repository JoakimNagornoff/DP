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

export const SUBMIT_WORKING_DAY = 'SUBMIT_WORKING_DAY';
export const SUBMIT_WORKING_DAY_PENDING = 'SUBMIT_WORKING_DAY_PENDING';
export const SUBMIT_WORKING_DAY_REJECTED = 'SUBMIT_WORKING_DAY_REJECTED';
export const SUBMIT_WORKING_DAY_FULFILLED = 'SUBMIT_WORKING_DAY_FULFILLED';

export const ADD_PROJECT_NOTE_TITLE = 'ADD_PROJECT_NOTE_TITLE';
export const ADD_PROJECT_NOTE_TEXT = 'ADD_PROJECT_NOTE_TEXT';
export const SUBMIT_PROJECT_NOTE = 'SUBMIT_PROJECT_NOTE';
export const SUBMIT_PROJECT_NOTE_PENDING = 'SUBMIT_PROJECT_NOTE_PENDING';
export const SUBMIT_PROJECT_NOTE_REJECTED = 'SUBMIT_PROJECT_NOTE_REJECTED';
export const SUBMIT_PROJECT_NOTE_FULFILLED = 'SUBMIT_PROJECT_NOTE_FULFILLED';

export const ADD_NOTES_TITLE = 'ADD_NOTES_TITLE';
export const ADD_NOTES_TEXT = 'ADD_NOTES_TEXT';
export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const GET_ALL_NOTES_FULFILLED = 'GET_ALL_NOTES_FULFILLED';
export const GET_ALL_NOTES_PENDING = 'GET_ALL_NOTES_PENDING';
export const GET_ALL_NOTES_REJECTED = 'GET_ALL_NOTES_REJECTED';

export const SUBMIT_NEW_NOTE = 'SUBMIT_NEW_NOTE';
export const SUBMIT_NEW_NOTE_FULFILLED = 'SUBMIT_NEW_NOTE_FULFILLED';
export const SUBMIT_NEW_NOTE_PENDING = 'SUBMIT_NEW_NOTE_PENDING';
export const SUBMIT_NEW_NOTE_REJECTED = 'SUBMIT_NEW_NOTE_REJECTED';

interface Project {
  id: string;
  name: string;
  workingDays: {
    date: string;
    hours: number;
  }[];
  projectNotes: {
    title: string;
    text: string;
  }[];
}

export interface ProjectState {
  name: string;
  chooseDate: string;
  chooseHours: number;
  chooseNotesTitle: string;
  chooseNotesText: string;

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
interface AddProjectNotesTitleAction {
  type: typeof ADD_PROJECT_NOTE_TITLE;
  payload: any;
}
interface AddProjectNotesTextAction {
  type: typeof ADD_PROJECT_NOTE_TEXT;
  payload: any;
}
interface SubmitProjectNoteAction {
  type: typeof SUBMIT_PROJECT_NOTE;
  payload: any;
}
interface SubmitProjectNotePendingAction {
  type: typeof SUBMIT_PROJECT_NOTE_PENDING;
  payload: any;
}
interface SubmitProjectNoteRejectedAction {
  type: typeof SUBMIT_PROJECT_NOTE_REJECTED;
  payload: any;
}
interface SubmitProjectNoteFullfilledAction {
  type: typeof SUBMIT_PROJECT_NOTE_FULFILLED;
  payload: {
    id: string;
    title: string;
    text: string;
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
  | SubmitWorkingDayFulfilledAction
  | SubmitProjectNoteAction
  | SubmitProjectNotePendingAction
  | SubmitProjectNoteRejectedAction
  | SubmitProjectNoteFullfilledAction
  | AddProjectNotesTitleAction
  | AddProjectNotesTextAction;

interface Note {
  title: string;
  text: string;
}

export interface NoteState {
  title: string;
  text: string;

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
  | SubmitNewNoteRejectedAction;
