import {
  ADD_NOTES_TITLE,
  ADD_NOTES_TEXT,
  GET_ALL_NOTES_FULFILLED,
  SUBMIT_NEW_NOTE_FULFILLED,
  NotesActionType,
  NoteState,
  SUBMIT_NEW_EDIT_NOTE,
  EDIT_NOTES_TITLE,
} from '../actions/types';

const initialState: NoteState = {
  title: '',
  text: '',
  id: '',
  projectId: '',
  createdAt: '',
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
    case EDIT_NOTES_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SUBMIT_NEW_EDIT_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
  }

  return state;
};

export default notesReducer;
