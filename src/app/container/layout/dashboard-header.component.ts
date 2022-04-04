
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AuthRepository } from 'src/app/repository/auth-repository';


@Component({
  selector: 'app-dashboard-header',
  template: `
  <div class= "headerOutlet" fxLayout = "row" fxLayoutAlign = "start center" fxLayoutGap = "15px">
      <img style = "height : 100%; width : 6% " src="../../../assets/1.png.png" alt="">
      <span fxFlex = "1 1 auto"> </span>

      <div fxFlex = "1 1 auto" fxLayout="row" fxLayoutAlign = "start center" fxLayoutGap = "15px">
     <button routerLinkActive ="selected" routerLink = "resume" class= "nav-bar-button"  mat-button>     
 Resume

     </button>
     <button routerLinkActive ="selected" routerLink = "settings"  class= "nav-bar-button"  mat-button>     
  settings

     </button>
     <button routerLinkActive ="selected" routerLink = "helpCenter" class= "nav-bar-button" mat-button>     
  help center

     </button>
     <button (click) = "logout()" class= "nav-bar-button" mat-button>     
  logout
</button>
<span fxFlex = "35%"></span>

<div class = "username" fxLayout="row"   fxLayoutAlign = "start center">
    <mat-icon> account_circle </mat-icon>
     <button class = "fontButton" mat-button> 
       
     {{this.username}}
    </button>
  </div>  
</div>

    
 
</div>
    
   `,

  styles: [

    `
.headerOutlet{
  background-color: #4c86bd;
  height: 10%;
  width: 100%
}

.username{
  color: #a8ee90;
  font-weight :bold;
  text-decoration : none;

}

.fontButton{
  text-transform: uppercase;
}
.nav-bar-button{
  color: #a8ee90;
  background: transparent;
  text-transform: uppercase;

}
.nav-bar-button:hover{
  border-bottom : 2px solid #ffdab4;
  color : #ffdab4;

}

.selected{
  border : 1px solid #a8ee90;
}

`
  ]
})

export class dashboardHeaderComponent implements OnDestroy {

  username = "";
  isalive = true
  constructor(private authRepo: AuthRepository, private router: Router) {
    this.authRepo.fetchUser().pipe(takeWhile(() =>this.isalive)).subscribe((user) => {
      this.username = user.name
    })
  }
  ngOnDestroy() {
this.isalive = false
  }

  logout() {
    this.router.navigate(['logout'])
  }
}










