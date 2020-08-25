import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';
import notesReducer from 'store/reducers/notesReducer';
import personReducer from 'store/reducers/personReducer';

const rootReducer = combineReducers({
  projectReducer,
  notesReducer,
  personReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
