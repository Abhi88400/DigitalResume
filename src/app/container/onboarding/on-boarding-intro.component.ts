import { NgComponentOutlet } from "@angular/common";

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApIService } from '../../service/App-service';
import { snackBarService } from '../../service/snackbar-service';

@Component({
    selector: 'app-on-boarding-intro',
    template: `
    
<div fxLayout = 'column' style = 'margin-top : 7rem;' fxLayoutAlign= "center center"  fxLayoutGap = '32px' fxFlex='100%'>  
<img class = 'image' src="../assets/1.png.png" alt="Not-found " srcset="">
<h1>welcome to make my resume</h1>

<h2>Thank You for choosing us to make your resume</h2>

<button  mat-raised-button (click) = 'navigation()'>lets go</button>
  </div>
   `,

    styles: [
        `
     
    .image{
        width : 10rem;
        height: 10rem;
      
        
    } 

    h1{
        color: #326fa8 ;
        font-weight : bold;
        font-size: 2.5rem;
    }
       button{
         /* align-items : center; */
         background-color : #42b561;
         color : white
    }
      `
    ]

})

export class OnBoardingIntroComponent {

    constructor(private router : Router) {

    }

    navigation() {

        this.router.navigate(['on_boarding','add']);
    }
        
}