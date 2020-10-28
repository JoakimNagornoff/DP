export const REQUEST_API_NOTE_DATA = 'REQUEST_API_NOTE_DATA'
export const RECIEVE_API_NOTE_DATA = 'RECIEVE_API_NOTE_DATA'

export const REQUEST_API_PROJECT_NOTES = 'REQUEST_API_PROJECT_NOTE'
export const RECIEVE_API_PROJECT_NOTES = 'RECIEVE_API_PROJECT_NOTES'


export const REQUEST_API_CREATE_NOTE = 'REQUEST_API_CREATE_NOTE';
export const RECIEVE_API_CREATE_NOTE = 'RECIEVE_API_CREATE_NOTE';

export const REQUEST_UPDATE_API_PROJECT_NOTE = 'REQUEST_UPDATE_API_PROJECT_NOTE'

export interface ProjectNote {
    id: string;
    note: {
        projectId: string;
        title: string
        text: string;
    }
    
}

export interface ProjectNoteState {
    data : ProjectNote[];
    loading: boolean;
    error: string
}

interface requestApiProjectNoteAction {
    type: typeof REQUEST_API_NOTE_DATA;
}
interface recieveApiProjectNoteAction {
    type: typeof RECIEVE_API_NOTE_DATA;
    payload: ProjectNote[];
}
interface requestApiProjectNotesAction {
    type: typeof REQUEST_API_PROJECT_NOTES;
}
interface recieveApiProjectNotesAction {
    type: typeof RECIEVE_API_PROJECT_NOTES;
    payload:ProjectNote[]; 
}

export type ProjectNoteActionType = requestApiProjectNoteAction | recieveApiProjectNoteAction | requestApiProjectNotesAction | recieveApiProjectNotesAction