import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from 'src/app/repository/auth-repository';

@Component({
    selector: 'app-logOut',
    template: `


   `,

    styles: []
})

export class LogoutComponent {

    constructor(private AuthRepo: AuthRepository, private router: Router) {
        this.AuthRepo.logOut();
        this.router.navigate([""])
    }

}