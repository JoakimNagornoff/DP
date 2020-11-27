import { ProjectNoteActionType, ProjectNote, REQUEST_API_CREATE_NOTE, REQUEST_API_PROJECT_NOTES, RECIEVE_API_PROJECT_NOTES, REQUEST_UPDATE_API_PROJECT_NOTE, RECIEVE_API_NOTE_BY_ID, REQUEST_API_NOTE_BY_ID, RECIEVE_API_CREATE_NOTE, RECIEVE_UPDATE_API_PROJECT_NOTE, REQUEST_DELETE_PROJECT_NOTE, DELETE_SUCCESS, FIREBASE_NOTE_LISTENER} from './types'


export const requestApiProjectNotesData = (projectId) => {
    return {
        type: REQUEST_API_PROJECT_NOTES,
        projectId
        
    }
}
export const recieveApiProjectNotesData = (data) : ProjectNoteActionType => {
    return {
        type: RECIEVE_API_PROJECT_NOTES,
        payload: data
    }
}
export const requestApiCreateProjectNoteData = () => {
    return {
        type: REQUEST_API_CREATE_NOTE
    }
}
export const recieveApiCreatedProjectNoteData = (data): ProjectNoteActionType => {
    return {
        type: RECIEVE_API_CREATE_NOTE,
        payload: data
    }
}
export const requestApiUpdateProjectNoteData = () => {
    return {
        type: REQUEST_UPDATE_API_PROJECT_NOTE
    }
}
export const recieveApiUpdateProjectNoteData = (data) : ProjectNoteActionType => {
    return {
        type:  RECIEVE_UPDATE_API_PROJECT_NOTE,
        payload: data
    }
}

export const AddNewProjectNote = (projectId,title, text, uid) => {
    return {
        type: REQUEST_API_CREATE_NOTE,
        projectId,
        title,
        text,
        uid
    }
}

export const updateProjectNote = (id, title, text) => {
    return {
        type: REQUEST_UPDATE_API_PROJECT_NOTE,
        id,
        title,
        text
    }
}
export const requestApiNoteByid = (id) => {
    return {
        type: REQUEST_API_NOTE_BY_ID,
        id
    }
}

export const recieveApiNoteById = (data: ProjectNote []) : ProjectNoteActionType => {
    return {
        type: RECIEVE_API_NOTE_BY_ID,
        payload: data
    }
}

export const requestApiDeleteNote = (id) => {
    return {
        type: REQUEST_DELETE_PROJECT_NOTE,
        id
    }
}
export const deleteSuccess = (id) => {
    return {
        type: DELETE_SUCCESS,
        payload: id

    }
}
export const firebaseListenerNotes = (data) => {
    return {
        type: FIREBASE_NOTE_LISTENER,
        payload : data
    }
}