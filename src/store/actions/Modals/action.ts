import {SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_PROJECT_NOTE, HIDE_MODAL_PROJECT_NOTE} from './types'

export const showModal = () => {
    return {
        type: SHOW_MODAL,
        payload: true
    }
}

export const closeModal = () => ({
    type: HIDE_MODAL,
    payload: false
})

export const showModalProjectNote = () => {
    return {
        type: SHOW_MODAL_PROJECT_NOTE,
        payload: true
    }
}
export const hideModalProjectNote = () => {
    return {
        type: HIDE_MODAL_PROJECT_NOTE,
        payload: false
    }
}