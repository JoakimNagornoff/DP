export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const SHOW_MODAL_PROJECT_NOTE = 'SHOW_MODAL_PROJECT_NOTE';
export const HIDE_MODAL_PROJECT_NOTE = 'HIDE_MODAL_PROJECT_NOTE';

export const SHOW_PROJECT_MODAL = 'SHOW_PROJECT_MODAL';
export const HIDE_PROJECT_MODAL = 'HIDE_PROJECT_MODAL';


export interface ModalState {
    openModal: boolean;
    openNoteModal: boolean;
    openProjectModal: boolean;
}

 interface showModalAction {
    type: typeof SHOW_MODAL;
    payload: boolean
}

 interface hideModaAction {
    type: typeof HIDE_MODAL;
    payload: boolean
}
interface showProjectNoteModalAction  {
    type: typeof SHOW_MODAL_PROJECT_NOTE;
    payload: boolean
}
interface hideProjectNoteModalAction  {
    type: typeof HIDE_MODAL_PROJECT_NOTE;
    payload: boolean
}
interface showProjectModalAction {
    type: typeof SHOW_PROJECT_MODAL;
    payload: boolean
}
interface hideProjectModalAction {
    type: typeof HIDE_PROJECT_MODAL;
    payload: boolean
}

export type ModalActiontype = showModalAction | hideModaAction | showProjectNoteModalAction | hideProjectNoteModalAction | showProjectModalAction | hideProjectModalAction