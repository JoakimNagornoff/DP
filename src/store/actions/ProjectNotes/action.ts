import { ProjectNoteActionType, ProjectNote, REQUEST_API_NOTE_DATA, RECIEVE_API_NOTE_DATA, REQUEST_API_CREATE_NOTE, REQUEST_API_PROJECT_NOTES, RECIEVE_API_PROJECT_NOTES, REQUEST_UPDATE_API_PROJECT_NOTE} from './types'

export const requestApiProjectNoteData = () => {
    return {
        type: REQUEST_API_NOTE_DATA
    }
}

export const recieveApiProjectNoteData = (data: ProjectNote[]) : ProjectNoteActionType => {
    return {
        type: RECIEVE_API_NOTE_DATA,
        payload: data
    }
}
export const requestApiProjectNotesData = (projectId) => {
    return {
        type: REQUEST_API_PROJECT_NOTES,
        projectId
        
    }
}
export const recieveApiProjectNotesData = (data: ProjectNote[]) : ProjectNoteActionType => {
    return {
        type: RECIEVE_API_PROJECT_NOTES,
        payload: data
    }
}

export const AddNewProjectNote = (projectId,title, text,) => {
    return {
        type: REQUEST_API_CREATE_NOTE,
        projectId,
        title,
        text
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