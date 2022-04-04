import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthRepository } from 'src/app/repository/auth-repository';

@Component({
    selector: 'app-setting-profile',
    template: `
<form [formGroup] = "this.SettingForm" (ngSubmit)= "this.SettingForm.valid && this.update()">
<div fxLayout = "column" fxLayoutAlign = "start stretch" fxLayoutGap = "1rem" >

<div fxLayout = "row" fxLayoutAlign = "center center" fxLayoutGap = "1.5rem">
<label>Name :  </label> 
<mat-form-field>
<input formControlName ="name"  placeholder = "Name " matInput />          
</mat-form-field>

</div>


<div  fxLayout = "row" fxLayoutAlign = "center center" fxLayoutGap = "1.5rem">
<label>Email :</label> 
<mat-form-field>
<input [disabled]= "true" [value] = "this.user? this.user.email: null"   placeholder = "email"  matInput />          
</mat-form-field>   
</div>

<div  fxLayoutAlign =  "end center">

<button type = "submit" mat-raised-button color = "accent">

Update Profile
</button>

</div>


</div>

</form>
  
   `,

    styles: [
        `
mat-form-field{
    width: 70%
}
label{
    font-size: 1rem;
    font-weight: bold;
}
input{
    text-transform : uppercase;
}
`

    ]
})

export class ProfileSettingComponent implements OnInit, OnDestroy {
    SettingForm: FormGroup;
    IsAlive = true;
    user: User

    constructor(private AuthRepo: AuthRepository) {

    }

    ngOnInit() {

        this.initUser();
        const name = this.user ? this.user.name : null;
        this.SettingForm = new FormGroup({
            name: new FormControl(name, [Validators.required])
        })
    }

    initUser() {
        const observer$ = this.AuthRepo.fetchUser()
        observer$.pipe(takeWhile(() => this.IsAlive)).subscribe((userName) => {
            this.user = userName
        })
    }

    ngOnDestroy() {

        this.IsAlive = false
    }

    update() {
        this.AuthRepo.updateProfile(this.SettingForm.value)
        .pipe(takeWhile(() => this.IsAlive)).subscribe((data) => {
                console.log(data)
            })

    }









}











