import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';
import {ProjectState } from './actions/Project/types';
import projectNoteReducer from 'store/reducers/projectNoteReducer';
import {ProjectNoteState} from './actions/ProjectNotes/types';
import modalReducer from './reducers/modalReducer'
import { ModalState } from './actions/Modals/types';


export interface ApplicationState {
  project: ProjectState;
  projectNote : ProjectNoteState;
  modal: ModalState;

}
const rootReducer = combineReducers({
  project: projectReducer,
  projectNote : projectNoteReducer,
  modal: modalReducer

});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
