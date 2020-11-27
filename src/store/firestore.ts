import firestore, { firebase } from '@react-native-firebase/firestore';
import {firebaseListener} from 'store/actions/Project/action';
import {firebaseListenerNotes} from 'store/actions/ProjectNotes/action'
import {firebaseListenerEndProject} from 'store/actions/EndsProject/action'

//type added
export const initializeFirestoreListener = (dispatch) => {
  firestore().collection('Projects')
    .onSnapshot(querySnapshot => {
      const docs = querySnapshot.docChanges().map(c => ({
        type: c.type, 
        data: {
          id: c.doc.id,
          project: c.doc.data()
        } 
      }));
      console.log('docs',docs)
    dispatch(firebaseListener(docs));
     // dispatch(firebaseListenerModified(docs))
  })
}

export const initializeFireStoreNoteListener = (dispatch) => {
  firestore().collection('ProjectNotes').onSnapshot(querySnapshot => {
    const docs = querySnapshot.docChanges().map(n => ({
      type: n.type,
      data: {
        id: n.doc.id,
        note: n.doc.data()
      }
    }));
    dispatch(firebaseListenerNotes(docs))
  })
}


export const initializeFirestoreListenerEndProject = (dispatch) => {
  firestore().collection('EndProjects').onSnapshot(querySnapShot => {
    const docs = querySnapShot.docChanges().map(e => ({
      type: e.type,
      data: {
        id: e.doc.id,
        endProject: e.doc.data()
      } 
    }))
    dispatch(firebaseListenerEndProject(docs))
  })
}