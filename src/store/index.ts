import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';
import notesReducer from 'store/reducers/notesReducer';

const rootReducer = combineReducers({
  projectReducer,
  notesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
