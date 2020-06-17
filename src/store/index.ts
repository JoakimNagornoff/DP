import {combineReducers} from 'redux';
import projectReducer from 'store/reducers/projectReducer';

const rootReducer = combineReducers({
  projectReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
