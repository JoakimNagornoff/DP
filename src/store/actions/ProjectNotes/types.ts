export const REQUEST_API_NOTE_DATA = 'REQUEST_API_NOTE_DATA'
export const RECIEVE_API_NOTE_DATA = 'RECIEVE_API_NOTE_DATA'

export const REQUEST_API_PROJECT_NOTES = 'REQUEST_API_PROJECT_NOTE'
export const RECIEVE_API_PROJECT_NOTES = 'RECIEVE_API_PROJECT_NOTES'


export const REQUEST_API_CREATE_NOTE = 'REQUEST_API_CREATE_NOTE';
export const RECIEVE_API_CREATE_NOTE = 'RECIEVE_API_CREATE_NOTE';

export const REQUEST_UPDATE_API_PROJECT_NOTE = 'REQUEST_UPDATE_API_PROJECT_NOTE';
export const RECIEVE_UPDATE_API_PROJECT_NOTE = 'RECIEVE_UPDATE_API_PROJECT_NOTE';
export const REQUEST_API_NOTE_BY_ID = 'REQUEST_API_NOTE_BY_ID';
export const RECIEVE_API_NOTE_BY_ID = 'RECIEVE_API_NOTE_BY_ID';

export const REQUEST_DELETE_PROJECT_NOTE = 'REQUEST_DELETE_PROJECT_NOTE';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const FIREBASE_NOTE_LISTENER = 'FIREBASE_NOTE_LISTENER';

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


interface requestApiProjectNotesAction {
    type: typeof REQUEST_API_PROJECT_NOTES;
}
interface recieveApiProjectNotesAction {
    type: typeof RECIEVE_API_PROJECT_NOTES;
    payload:any;
}
interface requestApiCreateProjectNoteAction {
    type: typeof REQUEST_API_CREATE_NOTE;
}
interface recieveApiCreatedProjectNoteAction {
    type: typeof RECIEVE_API_CREATE_NOTE;
    payload: any
}
interface requestApiNoteByIdAction  {
    type: typeof REQUEST_API_NOTE_BY_ID
}
interface recieveApiNoteByIdAction  {
    type: typeof RECIEVE_API_NOTE_BY_ID;
    payload: ProjectNote[];
}
interface requestApiUpdateProjectNoteDataAction {
    type: typeof REQUEST_UPDATE_API_PROJECT_NOTE;
}
interface recieveApiUpdateProjectNoteDataAction {
    type: typeof RECIEVE_UPDATE_API_PROJECT_NOTE;
    payload: any;
}
interface requestApiDeleteProjectNoteAction {
    type: typeof REQUEST_DELETE_PROJECT_NOTE
}
interface deleteSuccessProjectNoteAction {
    type: typeof DELETE_SUCCESS
    payload: any
}
interface firebaseNoteListenerAction  {
    type: typeof FIREBASE_NOTE_LISTENER
    payload: any
}
export type ProjectNoteActionType = requestApiProjectNotesAction | recieveApiProjectNotesAction | requestApiNoteByIdAction | recieveApiNoteByIdAction | requestApiCreateProjectNoteAction | recieveApiCreatedProjectNoteAction | requestApiUpdateProjectNoteDataAction | recieveApiUpdateProjectNoteDataAction | requestApiDeleteProjectNoteAction | deleteSuccessProjectNoteAction | firebaseNoteListenerAction