import {SHOW_MODAL, HIDE_MODAL, ModalState, ModalActiontype, SHOW_MODAL_PROJECT_NOTE, HIDE_MODAL_PROJECT_NOTE} from '../actions/Modals/types'

const initialState: ModalState = {
openModal: false,
openNoteModal: false,
}


const modalReducer =  (state = initialState, action : ModalActiontype): ModalState => {
    switch (action.type) {
      case SHOW_MODAL: {
        return {
          ...state,
        openModal: action.payload
        };
      }
      case HIDE_MODAL: {
        return {
          ...state,
          openModal: action.payload
        }
      }
      case SHOW_MODAL_PROJECT_NOTE: {
        return {
          ...state,
          openNoteModal: action.payload
        }
      }
      case HIDE_MODAL_PROJECT_NOTE: {
        return {
          ...state,
          openNoteModal: action.payload
        }
      }
    
      default:
        return state;
    }
  };
  

  export default modalReducer

