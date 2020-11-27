import {ProjectNoteActionType, ProjectNoteState, RECIEVE_API_CREATE_NOTE, REQUEST_API_PROJECT_NOTES, RECIEVE_API_PROJECT_NOTES, REQUEST_API_NOTE_BY_ID, RECIEVE_API_NOTE_BY_ID, REQUEST_API_CREATE_NOTE, RECIEVE_UPDATE_API_PROJECT_NOTE, DELETE_SUCCESS, FIREBASE_NOTE_LISTENER} from '../actions/ProjectNotes/types'

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
            case REQUEST_API_CREATE_NOTE: {
                return {
                    ...state,
                    loading: true
                }
            }
            case RECIEVE_API_CREATE_NOTE: {
                return {
                    ...state,
                    loading:false,
                    //  data: [...state.data, action.payload]
                }
            }
         
            case REQUEST_API_NOTE_BY_ID: {
                return {
                    ...state,
                    loading: true
                }
            }
            case RECIEVE_API_NOTE_BY_ID: {
                return {
                    ...state,
                    loading: false,
                    data: [...action.payload]
                }
            }
            case RECIEVE_UPDATE_API_PROJECT_NOTE: {
                const updateNote = action.payload;
                return {
                    ...state,
                    data: state.data.map(note => (
                        note.id === updateNote.id ? updateNote : note
                    )),
                }
                
            }
            case DELETE_SUCCESS: {
                const deletedNote = action.payload;
                return {
                    ...state,
                    data: state.data.filter(note => note.id !== deletedNote.id),
                }   
            }
            case FIREBASE_NOTE_LISTENER: {
                const currentNoteIds = state.data.map(note => note.id);

                const addNotes = action.payload.filter(n => n.type === 'added').map(n => n.data)
                const modifiedNotes = action.payload.filter(n => n.type === 'modified').map(n => n.data)
                const removedNotes = action.payload.filter(n => n.type === 'removed').map(n => n.data.id)

                const notesToAdd = addNotes.filter(n => !currentNoteIds.includes(n.id))
                const noteArrayWithAdded = [...state.data, ...notesToAdd]

                const notesArrayWithModified = noteArrayWithAdded.map(note => {
                    const modifiedNote = modifiedNotes.find(n => n.id === note.id)
                        if(modifiedNote){
                            return modifiedNote
                        }
                        return note
                })

                const noteArrayWithRemoved = notesArrayWithModified.filter(n => !removedNotes.includes(n.id))

                return {
                    ...state,
                    data: noteArrayWithRemoved
                }
            }
    
    }
    return state;
}

export default projectNoteReducer;