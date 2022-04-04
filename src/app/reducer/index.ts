import { ActionReducerMap, createSelector } from "@ngrx/store";
import *as fromUser from "./user-reducer";
import *as fromResume from "./resume-reducer";

export interface RootReducerState {
    user: fromUser.UserReducerState;
    resume: fromResume.ResumeReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {

    user: fromUser.UserReducer,
    resume: fromResume.ResumeReducer
}

export const getUserSelector = (state: RootReducerState) => {
    return state.user
}

export const UserLoggedin = createSelector(getUserSelector, fromUser.getLoggedIn)
export const UserLoggingin = createSelector(getUserSelector, fromUser.getLoggingIn)
export const getUsers = createSelector(getUserSelector, fromUser.getUser)


export const getResumeSelector = (state: RootReducerState) => {
    return state.resume;
}

export const Resumeloading = createSelector(getResumeSelector, fromResume.getLoading)
export const ResumeLoaded = createSelector(getResumeSelector, fromResume.getLoaded)
export const ResumeEntity = createSelector(getResumeSelector, fromResume.getEntity)
export const ResumeIds = createSelector(getResumeSelector, fromResume.getIds)
export const ResumeError = createSelector(getResumeSelector, fromResume.getError)
export const getResume = createSelector(getResumeSelector, fromResume.getResumeList)

export const getResumeById = (state: RootReducerState, id : string) => {
    const entities = ResumeEntity(state);
    console.log(entities , id)
    return entities[id];
}
