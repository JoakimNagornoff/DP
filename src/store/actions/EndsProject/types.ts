export const REQUEST_API_ENDPROJECT_DATA = 'REQUEST_API_ENDPROJECT_DATA';
export const RECIEVE_API_ENDPROJECT_DATA = 'RECIEVE_API_ENDPROJECT_DATA';

export const REQUEST_API_ENDPROJECT_DELETE = 'REQUEST_API_ENDPROJECT_DELETE';
export const DELETE_API_ENDPORJECT_SUCCESS = 'DELETE_API_ENDPORJECT_SUCCESS';

export const MOVED_API_ENDPROJECT_SUCCESS = 'MOVED_API_ENDPROJECT_SUCCESS';

export interface EndProject {
    id: string;
    endProject: {
        project: {
            name: string
        }   
    }
}
export interface EndProjectState {
    data: EndProject[];
    loading: boolean;
    error: string
}

interface requestApiEndProjectDataAction {
    type: typeof REQUEST_API_ENDPROJECT_DATA
}
interface recieveApiEndProjectDataAction {
    type: typeof RECIEVE_API_ENDPROJECT_DATA
    payload: any
}
interface requestApiEndProjectDeleteAction {
    type: typeof REQUEST_API_ENDPROJECT_DELETE
}
interface deleteApiEndProjectSuccess {
    type: typeof DELETE_API_ENDPORJECT_SUCCESS
    payload: any
}
interface movedApiEndProjectSuccessAction {
    type: typeof MOVED_API_ENDPROJECT_SUCCESS
    payload: any
}


export type EndProjectActionType = requestApiEndProjectDataAction | recieveApiEndProjectDataAction | requestApiEndProjectDeleteAction |deleteApiEndProjectSuccess | movedApiEndProjectSuccessAction