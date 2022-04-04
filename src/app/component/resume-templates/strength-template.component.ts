import { Component, Input } from '@angular/core';
import { strengths } from 'src/app/models/strengths';

@Component({
    selector: 'app-strength-template-card',
    template: `
 <div  fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; 
    overflow: hidden;">
        <h4>{{strength.name}}</h4>
      
        </div>
   `,

    styles: [`
    h4{
            font-weight : bold;
            color: green;
            letter-spacing : 1px;
            text-transform: uppercase;
        }
    `]
})

export class StrengthTemplateComponent {
@Input() strength : strengths

}