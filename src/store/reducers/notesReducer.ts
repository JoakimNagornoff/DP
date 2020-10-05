import {
  ADD_NOTES_TITLE,
  ADD_NOTES_TEXT,
  GET_ALL_NOTES_FULFILLED,
  SUBMIT_NEW_NOTE_FULFILLED,
  NotesActionType,
  NoteState,
} from '../actions/types';

const initialState: NoteState = {
  title: '',
  text: '',
  projectId: '',
  notes: [],
};

const notesReducer = (
  state = initialState,
  action: NotesActionType,
): NoteState => {
  switch (action.type) {
    case ADD_NOTES_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case ADD_NOTES_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case GET_ALL_NOTES_FULFILLED:
      return {
        ...state,
        notes: action.payload,
      };
    case SUBMIT_NEW_NOTE_FULFILLED:
      return {
        ...state,
        projectId: '',
        title: '',
        text: '',
        notes: [...state.notes, action.payload],
      };
  }

  return state;
};

export default notesReducer;
