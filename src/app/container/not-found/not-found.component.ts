import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notFound',
    template: `
    <div fxFlex= "100%"   fxLayoutAlign ="center center" >

            <div fxLayout = "column" fxLayoutGap = "20px">

            <h1>OOPS! you landed on a wrong page </h1>
        <button color = "primary" (click) = "this.GoBack()" mat-raised-button> GO Back</button>
                </div>

    </div>
   `,

    styles: []
})

export class NotFoundComponent {

    constructor(public router: Router) {

    }

    GoBack() {
        this.router.navigate([''])
    }
}