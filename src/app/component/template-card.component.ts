import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-template-card',
    template: `
 <div fxLayout = "row"> 

 <mat-card (click) = "OpenTemplate()"  matRipple >
        
        <img mat-card-image [src] = "Templates.image "/>
        <span > {{Templates.name}} </span>
       
       </mat-card>
 </div> 


   `,

    styles: [
        `
        mat-card{
    margin-top: 2rem;
    width: 177px;
    height: 220px;
    text-transform : uppercase;
    margin-left: 1rem

}

img{
    width: 177px;
    height: 200px;
}
span{
    text-align : center;
    font-weight: bold;
    color: #538ec3;
}
        `
    ]
})

export class TemplateCardComponent {

    @Input() Templates;
    @Input() ResumeId;

    constructor(private router: Router) {

    }
    OpenTemplate() {
        this.router.navigate(['dashboard', 'resume', 'template', this.ResumeId, this.Templates.id])
        console.log(this.ResumeId, this.Templates.id)
    }

}