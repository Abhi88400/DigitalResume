import { ApIService } from "../service/App-service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AuthRepository } from "../repository/auth-repository";



@Injectable()

export class OnBoardingInComplete implements CanActivate {

    constructor(private authRepo: AuthRepository, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const user$ = this.authRepo.fetchUser()
        return user$.pipe(
            filter(data => {
                return !!data}),

            map(data => {
                if (data.onboarding !== 200) {
                    return true
                } else {
                    this.router.navigate(['dashboard', 'resume'])
                }
            }))
    }

}