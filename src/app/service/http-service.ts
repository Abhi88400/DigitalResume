import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { authUtils } from "../utils/auth-utils";
import { snackBarService } from "./snackbar-service";

@Injectable()

export class httpService {

    private base_URL = 'http://localhost:3000/api';
    constructor(private httpClient: HttpClient, private snackbar: snackBarService, private router: Router) {
        this.httpClient = httpClient

    }

    post(url: string, body: any): Observable<any> {

        return this.httpClient.post(this.base_URL + url, body, { headers: this.fetchUserProfile() }).
            pipe(catchError(this.handleError.bind(this)))
    }

    Get(url: string, paramData?: any): Observable<any> {

        const data = {params: paramData, headers: this.fetchUserProfile()};
        return this.httpClient.get(this.base_URL + url, data).pipe(catchError(this.handleError.bind(this)))
    }

    Patch(url: string, body: any) {

        return this.httpClient.patch(this.base_URL + url, body,
            { headers: this.fetchUserProfile() }).pipe(catchError(this.handleError.bind(this)))
    }

    delete(url: string, body?: any): Observable<any> {

        return this.httpClient.request('delete', this.base_URL + url, { body, headers: this.fetchUserProfile() })

    }

    private fetchUserProfile() {
        return {
            Authorization: `Bearer ${authUtils.getAuthToken()}`
        }
    }

    private handleError(response: any) {
        const error = response.error;
        const keys = Object.keys(error)
        // console.log(keys)
        const key = keys[0]
        let message = response.message
        const status = response.status

        if (status === 401) {
            this.router.navigate(['logout'])
            this.snackbar.message("session expired")
        }

        if (key === 'isTrusted') {
            this.snackbar.decline('network Connection error')

        } else {
            this.snackbar.decline(error.message)
        
        }

        return throwError({ message, error })
    }
}







