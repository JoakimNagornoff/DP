import {LOGIN_USER_SUCCESS, LOGIN_USER_FAILED , UserState , UserActionTypes, ID_TOKEN} from 'store/actions/Users/types'

const initialState : UserState = {
    data: [],
}

const userReducer = (
    state = initialState,
    action: UserActionTypes
): UserState => {
    switch(action.type) {
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                data: action.payload
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
            
            }
        }
    }
        return state;
}

export default userReducer