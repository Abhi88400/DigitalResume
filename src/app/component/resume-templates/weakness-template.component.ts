import { Component, Input } from '@angular/core';
import { weakness } from 'src/app/models/weakness';

@Component({
    selector: 'app-weakness-template-card',
    template: `
     <div  fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; 
    overflow: hidden;">
        <h4> {{weakness.name}}</h4>
    
        </div>
   `,

    styles: [`
    
    h4{
            font-weight : bold;
            color: green;
            letter-spacing : 1px;
            text-transform: uppercase;
        }`]
})

export class WeaknessTemplateComponent {
    @Input() weakness: weakness

}







