import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { AuthRepository } from "../repository/auth-repository";




@Injectable()
export class verificationComplete implements CanActivate {

    constructor(private authRepo: AuthRepository, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const user$ = this.authRepo.fetchUser();
        return user$.pipe(
            filter(data => !!data),

            map(data => {

                if (data.verified) {
                    return true
                } else {
                    this.router.navigate(['verify'])
                }
            }))
    }

}
