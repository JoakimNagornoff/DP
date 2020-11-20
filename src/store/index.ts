import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';
import {ProjectState } from './actions/Project/types';
import projectNoteReducer from 'store/reducers/projectNoteReducer';
import {ProjectNoteState} from './actions/ProjectNotes/types';
import modalReducer from './reducers/modalReducer'
import { ModalState } from './actions/Modals/types';
import userReducer from './reducers/userReducer'
import endProjectReducer from 'store/reducers/endProjectReducer';
import {EndProjectState} from 'store/actions/EndsProject/types'


export interface ApplicationState {
  project: ProjectState;
  projectNote : ProjectNoteState;
  modal: ModalState;
  endProject : EndProjectState;


}
const rootReducer = combineReducers({
  project: projectReducer,
  projectNote : projectNoteReducer,
  modal: modalReducer,
  user: userReducer,
  endProject : endProjectReducer

});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
