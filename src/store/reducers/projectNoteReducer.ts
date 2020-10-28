import {ProjectNoteActionType, ProjectNoteState, RECIEVE_API_CREATE_NOTE, RECIEVE_API_NOTE_DATA, REQUEST_API_CREATE_NOTE, REQUEST_API_NOTE_DATA, REQUEST_API_PROJECT_NOTES, RECIEVE_API_PROJECT_NOTES} from '../actions/ProjectNotes/types'

const initialState : ProjectNoteState = {
    data: [],
    loading: false,
    error: ''
};

const projectNoteReducer = (
    state = initialState,
    action : ProjectNoteActionType,
):  ProjectNoteState => {
    switch(action.type){
        case REQUEST_API_PROJECT_NOTES:
            return {
                ...state,
                loading: true
            }
            case RECIEVE_API_PROJECT_NOTES: {
                return {
                    ...state,
                    loading: false,
                    data: action.payload
                }
            }
            case RECIEVE_API_NOTE_DATA: {
                return {
                    ...state,
                    loading: false,
                    error: 'error'
                }
            }
    
    }
    return state;
}

export default projectNoteReducer;