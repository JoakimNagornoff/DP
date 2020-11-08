import {SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_PROJECT_NOTE, HIDE_MODAL_PROJECT_NOTE, SHOW_PROJECT_MODAL, HIDE_PROJECT_MODAL} from './types'

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

export const showProjectModal = () => {
    return {
        type: SHOW_PROJECT_MODAL,
        payload: true
    }
}

export const hideProjectModal = () => {
    return {
        type: HIDE_PROJECT_MODAL,
        payload: false
    }
}