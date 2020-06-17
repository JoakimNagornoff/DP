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
