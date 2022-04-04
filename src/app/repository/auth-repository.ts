import { User } from "../models/user"
import { Store } from "@ngrx/store"
import { Injectable } from "@angular/core"
import { ApIService } from "../service/App-service"
import { combineLatest, Observable } from "rxjs"
import { LoginRequestAction, LoginSuccessAction, LogoutAction, UserProfileRequestAction, UserProfileSuccessAction, UserProfileUpdateAction } from "../action/user-action"
import { getUsers, UserLoggedin, UserLoggingin } from "../reducer"
import { map, take } from "rxjs/operators"
import { authUtils } from "../utils/auth-utils"

@Injectable()

export class AuthRepository {
    constructor(private AppService: ApIService, private store: Store) {
    }


    login(data: { email: string, password: string }): Observable<User> {

        this.store.dispatch(new LoginRequestAction());
        this.AppService.loginAndSetAuthToken(data).subscribe((res) => {
            if(res){
                this.store.dispatch(new LoginSuccessAction(res))
            }
        })
        return this.store.select(getUsers)
    }

    signup(
        data: {
            email: string,
            password: string,
            confirm_password: string,
            job_category: string,
            name: string,
            experience_level: string,
        }): Observable<User> {

        return this.AppService.signup(data);
    }







    resendEmail(data: { email: string }): Observable<any> {

        return this.AppService.resendEmail(data);
    }


    resetPassword(data: {
        code: any,
        new_password: string,
        confirm_password: string
    }): Observable<any> {
        return this.AppService.resetPassword(data)
    }


    fetchUser(force = false): Observable<User> {

        const loggedIn$ = this.store.select(UserLoggedin)
        const loggingIn$ = this.store.select(UserLoggingin)
        const users$ = this.store.select(getUsers)

        combineLatest([loggingIn$, loggedIn$, users$]).
            pipe(take(1)).subscribe((data) => {
                if (!data[0] && !data[1] || force) {

                    this.store.dispatch(new UserProfileRequestAction())
                    this.AppService.fetchUser().pipe(take(1)).subscribe(user => {

                        this.store.dispatch(new UserProfileSuccessAction(user))
                    })
                }
            })
        return users$
    }


    logOut() {
        authUtils.removeAuthToken();
        this.store.dispatch(new LogoutAction())
    }

    updateProfile(data) {
        return this.AppService.updateProfile(data).pipe(map((res) => {
            this.store.dispatch(new UserProfileUpdateAction(res))
        }))
    }

    updatePassword(data) {
        return this.AppService.updatePassword(data);
    }

}