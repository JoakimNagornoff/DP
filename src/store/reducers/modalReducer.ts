import {SHOW_MODAL, HIDE_MODAL, ModalState, ModalActiontype, SHOW_MODAL_PROJECT_NOTE, HIDE_MODAL_PROJECT_NOTE, SHOW_PROJECT_MODAL, HIDE_PROJECT_MODAL} from '../actions/Modals/types'

const initialState: ModalState = {
openModal: false,
openNoteModal: false,
openProjectModal: false
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
      case SHOW_PROJECT_MODAL: {
        return {
          ...state,
          openProjectModal: action.payload
        }
      }
      case HIDE_PROJECT_MODAL: {
        return {
          ...state,
          openProjectModal: action.payload
        }
      }
      default:
        return state;
    }
  };
  

  export default modalReducer

