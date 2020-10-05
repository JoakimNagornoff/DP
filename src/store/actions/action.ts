import {
  ADD_PROJECT_NAME,
  ADD_PROJECT_DATE,
  ADD_PROJECT_HOURS,
  GET_ALL_PROJECTS,
  ProjectActionType,
  SUBMIT_NEW_PROJECT,
  SUBMIT_WORKING_DAY,
  ADD_NOTES_TITLE,
  ADD_NOTES_TEXT,
  GET_ALL_NOTES,
  NotesActionType,
  SUBMIT_NEW_NOTE,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  LoginActionType,
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

export const AddNotesTitle = (title: string): NotesActionType => {
  return {
    type: ADD_NOTES_TITLE,
    payload: title,
  };
};
export const AddNotesText = (text: string): NotesActionType => {
  return {
    type: ADD_NOTES_TEXT,
    payload: text,
  };
};
export const submitNewNote = (
  projectId: string,
  title: string,
  text: string,
): NotesActionType => {
  return {
    type: SUBMIT_NEW_NOTE,
    payload: firestore()
      .collection('ProjectNotes')
      .add({
        projectId: projectId,
        title: title,
        text: text,
      })
      .then(res => {
        return {
          id: res.id,
          title,
          text,
          projectId,
        };
      }),
  };
};
export const getAllNotes = (): NotesActionType => {
  return {
    type: GET_ALL_NOTES,
    payload: firestore()
      .collection('ProjectNotes')
      .get()
      .then(res => {
        return res.docs.map(doc => {
          const notesData = doc.data();
          return {
            id: doc.id,
            ...notesData,
          };
        });
      }),
  };
};

export const AuthLogin = (
  email: string,
  password: string,
  callback?: () => any,
): LoginActionType => {
  return {
    type: AUTH_LOGIN,
    payload: async () => {
      const result = await auth().signInWithEmailAndPassword(email, password);
      await result.user.updateProfile({displayName: email});
      await firestore()
        .collection('Users')
        .doc(result.user.uid)
        .set({email});
      const userDoc = await (await firestore()
        .collection('Users')
        .doc(result.user.uid)
        .get()).data();
      if (callback) callback();
      return {
        uid: result.user.uid,
        emai: result.user.email,
      };
    },
  };
};
export const AuthLogout = (callback?: () => any): LoginActionType => {
  return {
    type: AUTH_LOGOUT,
    payload: auth()
      .signOut()
      .then(() => {
        if (callback) callback();
      }),
  };
};
