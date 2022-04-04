import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthRepository } from 'src/app/repository/auth-repository';

@Component({
    selector: 'app-change-password',
    template: ` 
    
    <form [formGroup] = "this.passwordForm" (ngSubmit)= "this.passwordForm.valid && update()">
    <div fxLayout = "column" fxLayoutAlign = "start stretch" fxLayoutGap = "1rem" >

<div fxLayout = "row" fxLayoutAlign = "center center" fxLayoutGap = "1.5rem">
<label>old-password :  </label> 
<mat-form-field>      
<input formControlName ="old_password"  placeholder = "old_password " matInput />          
</mat-form-field>
</div>

<div  fxLayout = "row" fxLayoutAlign = "center center" fxLayoutGap = "1.5rem">
<label>change-password :</label> 
<mat-form-field>
<input formControlName ="new_password" placeholder = "change_password"  matInput />          
</mat-form-field>   
</div>

<div  fxLayout = "row" fxLayoutAlign = "center center" fxLayoutGap = "1.5rem">
<label>confirm-password :</label> 
<mat-form-field>
<input formControlName = "confirm_password" placeholder = "confirm_password"  matInput />          
</mat-form-field>   
</div>


<div  fxLayoutAlign =  "end center">
    <button type = "submit" mat-raised-button color = "accent">
        Update Password
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

    `
    ]
})

export class ChangePasswordComponent implements OnInit, OnDestroy {
    passwordForm: FormGroup;
    IsAlive = true;
    user: User

    constructor(private AuthRepo: AuthRepository) {


    }

    ngOnInit() {
        this.passwordForm = new FormGroup({
            old_password: new FormControl(null, [Validators.required]),
            new_password: new FormControl(null, [Validators.required]),
            confirm_password: new FormControl(null, [Validators.required]),
        })
    }

    ngOnDestroy() {
        this.IsAlive = false
    }

    update() {

        this.AuthRepo.updatePassword(this.passwordForm.value).pipe(takeWhile((res) => this.IsAlive)).subscribe((data) => {
            console.log(data)
        })
    }
}
// password: "$2a$10$LzFeG1GspxMH.qwdSHNHme8nQdiXd94ABBcd3mcxi/IC6m6cM.XvW"
// "$2a$10$YgNszI68n3nJAJJWbJy1peDnXX3dPc7FaGgonwkL7/tAVlFLhgv/C"













