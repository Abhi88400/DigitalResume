import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthRepository } from "../repository/auth-repository";
import { ApIService } from "../service/App-service";
import { authUtils } from "../utils/auth-utils";

@Injectable()
export class anonGuard implements CanActivate {
    constructor(private router: Router, private ApIService: ApIService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const isTokenAvailable = authUtils.getAuthToken();

        if (!isTokenAvailable) {

            return true;

        } else {
            // console.log(this.apiService.fetchUser())

            const guard$ = this.ApIService.fetchUser();
            return guard$.pipe(map(data => {
                console.log(data)
                if (!data.verified) {
                    this.router.navigate(['verify'])
                } else if (data.onboarding !== 200) {
                    this.router.navigate(['on_boarding'])
                } else {
                    this.router.navigate(['dashboard', "resume"])
                }
            }))

        }
    }
}






