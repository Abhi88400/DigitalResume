import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { authUtils } from "../utils/auth-utils";

@Injectable()

export class authenticationGuard implements CanActivate {

    constructor(private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

        const isTokenAvailable = authUtils.getAuthToken()


        if (!isTokenAvailable) {

            this.router.navigate([''])
        } else {

            return true

        }



    }






}