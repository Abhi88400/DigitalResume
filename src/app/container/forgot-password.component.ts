import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApIService } from '../service/App-service';
import { snackBarService } from '../service/snackbar-service';


@Component({
  selector: 'app-forgotpassword',
  template: `
   <form (ngSubmit) = 'this.resendEmail.valid &&  !this.isValid?  sendingEmail() : changePassword()  ' [formGroup]= 'this.resendEmail' 
     class= 'overlay'  color = 'aqua' fxLayoutAlign = 'center center' fxLayout = 'column' fxLayoutGap= '40px'>


   <img class= 'image-size' src = '../assets/1.png.png'>
    <mat-card fxLayout = 'column' >
      <h1>verify Email</h1>
  
    <mat-form-field *ngIf = ' !this.isValid ' >
  <input formControlName = 'email'  matInput placeholder="email">
  <mat-error>valid email is required</mat-error>
  </mat-form-field>

  <div *ngIf = 'this.isValid'>

    <mat-form-field >
  <input  formControlName = 'code'  matInput placeholder="code">
  <mat-error>valid email is required</mat-error>
  </mat-form-field>

    <mat-form-field  >
  <input  formControlName = 'new_password'  matInput placeholder="new password">
  <mat-error>valid email is required</mat-error>
  </mat-form-field>

    <mat-form-field >
  <input  formControlName = 'confirm_password'  matInput placeholder="confirm password">
  <mat-error>valid email is required</mat-error>
  </mat-form-field>

  </div>

 <div *ngIf = '!this.isValid'  style =' margin-top : 2rem' fxLayout = 'row' fxLayoutGap = '50px' fxLayoutAlign = 'end'>
 <mat-spinner *ngIf = "this.spinnerLoading" diameter = 31 color = 'accent'></mat-spinner>
  <button  type = 'submit'   color = 'primary' mat-raised-button>Send-Email</button>
</div> 

<div *ngIf = 'this.isValid' style =' margin-top : 2rem' fxLayout = 'row' fxLayoutGap = '50px' fxLayoutAlign = 'end'>
  <button (click) = 'goToLoginButton()'    color = 'accent' mat-raised-button>Go To Login</button>
   <button     color = 'primary' mat-raised-button>change Password</button>
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

    height : auto;
    width: 21rem
  }

  .image-size{
    width:10%;
    
  }
  `
  ]
})

export class resetPasswordComponent {
  resendEmail: FormGroup
  isValid = false
  spinnerLoading = false

  constructor(private appService: ApIService,
    private snackbar: snackBarService,
    private router: Router) {

    this.resendEmail = new FormGroup({


      email: new FormControl(null, !this.isValid ? [Validators.required] : []),
      code: new FormControl(null,),
      new_password: new FormControl(null, [Validators.minLength(8), Validators.maxLength(20)]),
      confirm_password: new FormControl(null, [Validators.minLength(8), Validators.maxLength(20)])

    })
  }

  sendingEmail() {
    this.spinnerLoading = true
    this.appService.resendEmail(this.resendEmail.value).subscribe((data) => {

      console.log(data)

      this.spinnerLoading = false
      this.isValid = true

      this.snackbar.message('code has been sent to your email' + this.resendEmail.get('email').value)
      this.resendEmail.get('code').setValidators([Validators.required])
      this.resendEmail.get('new_password').setValidators([Validators.required])
      this.resendEmail.get('confirm_password').setValidators([Validators.required])


    }, (err) => {
      this.spinnerLoading = false
      this.snackbar.decline('email is not matching')
    })

  }
  changePassword() {
    this.spinnerLoading = true
    let resetYourPassword$ = this.appService.resetPassword(this.resendEmail.value);
    resetYourPassword$.subscribe(data => {
      this.spinnerLoading = false
      this.snackbar.message('your password has been changed')
      this.router.navigate(['login'])

    })

  }
  goToLoginButton() {
    this.router.navigate(['login'])
  }

}

// OLD PASSWORD
// $2a$10$yGRwHx7Xro9yOoxYCULjFOFMsYFBqd.vQpFII7r.EWux9V.HtBu12






















