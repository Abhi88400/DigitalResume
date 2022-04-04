import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthRepository } from '../repository/auth-repository';
import { ApIService } from '../service/App-service';
import { snackBarService } from '../service/snackbar-service';

@Component({
  selector: 'app-login',
  template: `

      <form (ngSubmit) = 'this.loginForm.valid ' [formGroup]= 'this.loginForm'
      class= 'overlay' fxLayoutAlign = 'center center' fxLayout = 'column' fxLayoutGap= '45px'>
      <img class= 'image-size' src = '../assets/1.png.png'>
      <mat-card fxLayout = 'column' >
      <h1>Login</h1>
  
      <mat-form-field >
      <input formControlName = 'email' matInput placeholder="email">
        <mat-error>valid field is required</mat-error>
        </mat-form-field>

      <mat-form-field >
      <input formControlName = 'password' matInput placeholder="password">
      <mat-error>valid field is required</mat-error>
      </mat-form-field>

  
      <a href = '/forgotpassword' >forgot password?</a>

      <div style =' margin-top : 2rem' fxLayout = 'row' fxLayoutGap = '50px' fxLayoutAlign = 'end'>
      <mat-spinner *ngIf = "this.spinnerLoading" diameter = 31 color = 'accent'></mat-spinner>

      <button  (click) = 'loginUser()' color = 'accent' mat-raised-button>login</button>
      <button  (click) = 'signupUser()' color = 'primary' mat-raised-button>Signup</button>

        </div> 
  
      </mat-card>
        </form>
   `,

  styles: [`
        .overlay{
      
          width: 100%;
           height: 100%
        }
        .mat-card{
      
          height : 20rem;
          width: 21rem
        }
        .image-size{
          width:10%;
          
        }
        `
  ]
})


export class loginComponent {
  loginForm: FormGroup;
  spinnerLoading = false;

  constructor(private authRepo: AuthRepository, private snackbar: snackBarService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });
  }

  signupUser() {
    this.router.navigate(['signup'])
  }

  loginUser() {
    this.spinnerLoading = true

    const login$ = this.authRepo.login(this.loginForm.value).pipe(filter(res => !!res));
    login$.subscribe((data) => {
      if (data) {
        this.spinnerLoading = false
        this.snackbar.success('Successfull!')
        this.router.navigate(['verify'], { queryParams: { email: data.email } })
        console.log(data)
      }
    }, (error: any) => {
      this.spinnerLoading = false
      this.snackbar.message("something is going wrong!! Email Not Exist")
    })
  }
}













