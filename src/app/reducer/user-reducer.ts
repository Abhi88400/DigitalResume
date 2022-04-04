import { Action } from "../action";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ACTION, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_UPDATE_SUCCESS } from "../action/user-action";
import { User } from "../models/user";

export interface UserReducerState {
    loggedIn: boolean,
    loggingIn: boolean
    user: User
}

export const initialState: UserReducerState = {

    loggedIn: false,
    loggingIn: false,
    user: null
}

export function UserReducer(state = initialState, action: Action): UserReducerState {

    switch (action.type) {
        case USER_PROFILE_REQUEST:
        case LOGIN_REQUEST: {
            return { ...state, loggingIn: true }
        }

        case USER_PROFILE_SUCCESS:
        case LOGIN_SUCCESS: {
            return { ...state, ...{ loggedIn: true, user: action.payload, loggingIn: false } }
        }

        case LOGOUT_ACTION: {
            return { ...initialState };
        }

        case USER_UPDATE_SUCCESS: {
            return { ...state, user: action.payload }
        }
        default: {
            return state
        }
    }
}


export const getLoggingIn = (state: UserReducerState) => {
    return state.loggingIn;
}

export const getLoggedIn = (state: UserReducerState) => {
    return state.loggedIn;
}

export const getUser = (state: UserReducerState) => {
    return state.user;
}

