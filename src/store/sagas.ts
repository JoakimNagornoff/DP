import {all, call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import {requestApiProjectData, recieveApiProjectData, recieveApiUpdateProjectdata, recieveApiProjectDataWithId, requestApiProjectDataWithId} from './actions/Project/action'
import { REQUEST_API_CREATE_PROJECT, REQUEST_API_PROJECT_DATA, REQUEST_API_PROJECT_DATA_WITH_ID, REQUEST_API_UPDATE_PROJECT } from './actions/Project/types';
import {requestApiProjectNoteData, recieveApiProjectNoteData, recieveApiProjectNotesData, recieveApiNoteById, } from './actions/ProjectNotes/action'
import { REQUEST_API_CREATE_NOTE, REQUEST_API_NOTE_DATA, REQUEST_API_PROJECT_NOTES, RECIEVE_API_PROJECT_NOTES, REQUEST_UPDATE_API_PROJECT_NOTE, REQUEST_API_NOTE_BY_ID} from './actions/ProjectNotes/types'

import {createData, fetchData, fetchNoteData, createNoteData, updateProjectData, fetchProjectNoteData, updateProjectNoteData, getDataWithId, getProjectNotesDataWithId} from '../environments/environment'

//get api Projects
function* getApiData() {
   try {
      const data = yield call(fetchData)
     yield put(recieveApiProjectData(data));
   } catch (e) {
     console.log(e);
   }
}
//create api project
function* createApiData(action) {
  try {
    const res = yield createData(action.name);
    const data = yield call(fetchData);
    yield put(recieveApiProjectData(data));
  } catch(e) {
    console.log(e)
  }
}
//get project data with Id
function* getApiDataWithId(action) {
  try {
    const data = yield call(getDataWithId, action.id);
    yield put(recieveApiProjectData(data))
  }
  catch(e) {
    console.log(e)
  }
}
//get project notes data with id
function* getApiProjecNoteData(action){
  try {
    const data = yield call(getProjectNotesDataWithId, action.id);
    yield put(recieveApiNoteById(data))
  }
  catch(e) {
    console.log(e)
  }
}

//create api projectNote
function* createApiNoteData(action) {
  try {
    const res = yield createNoteData(action.projectId, action.title, action.text);
    const data = yield call(fetchNoteData);
    yield put(recieveApiProjectNotesData(data))

  }catch(e) {
    console.log(e)
  }
}

//get api project notes
function* getApiProjectNoteData() {
  try {
    const data = yield call(fetchNoteData);
    yield put(recieveApiProjectNoteData(data));
  }catch(e) {
    console.log(e)
  }
}
//get api project notes by projectId
function* getApiProjectNotesData(action) {
  try {
    const data = yield call (fetchProjectNoteData,action.projectId) ;
    yield put(recieveApiProjectNoteData(data))
  }catch(e) {
      console.log(e)
    }
}
//update project  data
function* updateApiProjectData(action) {
  console.log(action.id)
  try {
    const res = yield updateProjectData(action.id, action.hours, action.date);
    const data = yield call(fetchData);
    yield put(recieveApiProjectData(data));
  } catch(e) {
    console.log(e)
  }
}
//update project notes data
function* updateApiProjectNote(action) {
  try {
    const res = yield updateProjectNoteData(action.id, action.title, action.text);
    const data = yield call(fetchNoteData)
    yield put(recieveApiProjectNoteData(data))
  }
  catch(e) {
    console.log(e)
  }
}


function* projectSaga() {
  yield takeEvery(REQUEST_API_PROJECT_DATA, getApiData);
}
function* getApiNoteData() {
  yield takeEvery(REQUEST_API_NOTE_DATA, getApiProjectNoteData)
}
function* watchAddProject() {
  yield takeEvery(REQUEST_API_CREATE_PROJECT, createApiData);
}
function* watchAddProjectNote() {
  yield takeEvery(REQUEST_API_CREATE_NOTE, createApiNoteData);
}
function* watchUpdateProjectData() {
  yield takeEvery(REQUEST_API_UPDATE_PROJECT, updateApiProjectData);
}
function* watchGetProjectNotes() {
  yield takeEvery(REQUEST_API_PROJECT_NOTES, getApiProjectNotesData);
}
function* watchUpdateProjectNote() {
  yield takeEvery(REQUEST_UPDATE_API_PROJECT_NOTE,updateApiProjectNote )
}
function* watchgetApiDataWithId() {
  yield takeEvery(REQUEST_API_PROJECT_DATA_WITH_ID, getApiDataWithId)
}
function* watchGetApiProjectNoteWithId(){
  yield takeEvery(REQUEST_API_NOTE_BY_ID, getApiProjecNoteData)
}

export default function * rootSaga() {
  yield all([
    projectSaga(),
    getApiNoteData(),
    watchAddProject(),
    watchAddProjectNote(),
    watchUpdateProjectData(),
    watchGetProjectNotes(),
    watchUpdateProjectNote(),
    watchgetApiDataWithId(),
    watchGetApiProjectNoteWithId()
  ])
}