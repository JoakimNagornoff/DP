import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';
import {ProjectState } from './actions/Project/types';
import projectNoteReducer from 'store/reducers/projectNoteReducer';
import {ProjectNoteState} from './actions/ProjectNotes/types';


export interface ApplicationState {
  project: ProjectState;
  projectNote : ProjectNoteState;

}
const rootReducer = combineReducers({
  project: projectReducer,
  projectNote : projectNoteReducer

});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
