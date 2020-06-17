import {
  ADD_PROJECT_NAME,
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  GET_ALL_PROJECTS,
  ProjectActionType,
  SUBMIT_NEW_PROJECT,
  SUBMIT_WORKING_DAY,
} from './types';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import {RootState} from 'store';

export const AddProjectName = (name: string): ProjectActionType => {
  return {
    type: ADD_PROJECT_NAME,
    payload: name,
  };
};

export const AddProjectDate = (date: string): ProjectActionType => {
  return {
    type: ADD_PROJECT_DATE,
    payload: date,
  };
};
export const AddProjectHours = (hours: number): ProjectActionType => {
  return {
    type: ADD_PROJECT_HOURS,
    payload: hours,
  };
};

export const getAllProjects = (): ProjectActionType => {
  return {
    type: GET_ALL_PROJECTS,
    payload: firestore()
      .collection('Projects')
      .get()
      .then(result => {
        return result.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            workingDays: data.workingDays
              ? data.workingDays.map((wd: any) => ({
                  ...wd,
                  date: wd.date.toDate(),
                }))
              : [],
          };
        });
      }),
  };
};

export const submitNewProject = (store: RootState): ProjectActionType => {
  const {projectReducer: project} = store;
  return {
    type: SUBMIT_NEW_PROJECT,
    payload: firestore()
      .collection('Projects')
      .add({
        name: project.name,
      })
      .then(result => {
        return {
          id: result.id,
          name: project.name,
        };
      }),
  };
};

export const submitWorkingDay = (
  id: string,
  date: string,
  hours: number,
): ProjectActionType => {
  return {
    type: SUBMIT_WORKING_DAY,
    payload: firestore()
      .collection('Projects')
      .doc(id)
      .update({
        workingDays: firestore.FieldValue.arrayUnion({
          date: new Date(date),
          hours,
        }),
      })
      .then(() => {
        return {
          id,
          date,
          hours,
        };
      }),
  };
};
