import { Action } from "./index";
import { User } from "../models/user";


export const LOGIN_REQUEST = "[LOGIN] REQUEST";
export const LOGIN_SUCCESS = "[LOGIN] SUCCESS";
export const USER_PROFILE_REQUEST = "[USER PROFILE] REQUEST";
export const USER_PROFILE_SUCCESS = "[USER PROFILE] SUCCESS";
export const USER_UPDATE_SUCCESS = "[USER UPDATE] SUCESS";
export const LOGOUT_ACTION = "[LOGOUT] ACTION";

export class LoginRequestAction implements Action {
    readonly type = LOGIN_REQUEST
}

export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS

    constructor(public payload?: User) {
    }
}

export class UserProfileRequestAction implements Action {
    readonly type = USER_PROFILE_REQUEST
constructor(){
}
}

export class UserProfileSuccessAction implements Action {
    readonly type = USER_PROFILE_SUCCESS

    constructor(public payload: User) {

    }
}

export class UserProfileUpdateAction implements Action {
    readonly type = USER_UPDATE_SUCCESS
    constructor(public payload: User) {

    }

}

export class LogoutAction implements Action {
    readonly type = LOGOUT_ACTION

}




