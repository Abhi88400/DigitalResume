import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthRepository } from '../repository/auth-repository';
import { ApIService } from '../service/App-service';
import { snackBarService } from '../service/snackbar-service';

@Component({
    selector: 'app-signup',
    template: `
  <form (ngSubmit) = 'this.signupForm.valid && signupUser()' [formGroup]= 'this.signupForm'
  class= 'overlay' fxLayoutAlign = 'center center' fxLayout = 'column' fxLayoutGap= '45px'>
   <img class= 'image-size' src = '../assets/1.png.png'>
    <mat-card fxLayout = 'column' >
      <h1>signup</h1>
  
    <mat-form-field >
  <input formControlName = 'email' matInput placeholder="email">
  <mat-error>valid email is required</mat-error>
  </mat-form-field>

  <mat-form-field >
  <input formControlName = 'password' type = 'password' matInput placeholder="password">
    <mat-error>valid field is required</mat-error>
</mat-form-field>

    <mat-form-field >
    <input formControlName = 'confirm_password' type = 'password' matInput placeholder="confirm_password">
    <mat-error>valid field is required</mat-error>
</mat-form-field>

    <mat-form-field >
    <input formControlName = 'job_category' matInput placeholder="job category">
    <mat-error>valid job category is required</mat-error>
</mat-form-field>

    <mat-form-field >
    <input formControlName = 'name' matInput placeholder="full-Name">
    <mat-error>valid full Name is required</mat-error>
</mat-form-field>

<mat-form-field>
    <input formControlName = 'experience_level' matInput placeholder="experience-level">
    <mat-error>valid experience level is required</mat-error>
</mat-form-field>
 


<div style =' margin-top : 2rem' fxLayout = 'row' fxLayoutGap = '50px' fxLayoutAlign = 'end'>
<mat-spinner *ngIf = "this.spinnerLoading" diameter = 31 color = 'accent'></mat-spinner>

<button (click) = 'loginUser() ' color = 'accent' mat-raised-button>Go To Login</button>
<button type = 'submit' color = 'primary' mat-raised-button>Signup</button>

</div> 
  
</mat-card>
</form>
   `,

    styles: [
        `
        .overlay{
      
          width: 100%;
           height: 100%
        }
        .mat-card{
      
          height : 40rem;
          width: 28rem
        }
        .image-size{
          width:10%;
        }
        `
    ]
})

export class signupComponent {

    signupForm: FormGroup;
    spinnerLoading = false;

    constructor(private authRepo: AuthRepository, private snackbar: snackBarService, private router: Router) {

        this.signupForm = new FormGroup({

            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
            confirm_password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
            name: new FormControl(null, [Validators.required]),
            job_category: new FormControl(null, [Validators.required]),
            experience_level: new FormControl(null, [Validators.required]),
        });

    }


    loginUser() {
        this.router.navigate([' '])
    }


    signupUser() {
        this.spinnerLoading = true;
        const signUp$ = this.authRepo.signup(this.signupForm.value);

        signUp$.subscribe((data) => {
            console.log(data, "hello");
            this.spinnerLoading = false;
            this.router.navigate(['']);
            this.snackbar.success("successfull Signup");

        }, ((err: any) => {
            this.spinnerLoading = false;
            console.log(err);
            this.snackbar.decline("something is error");
        }))

    }



}

