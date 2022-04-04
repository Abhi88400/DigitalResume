import { Component, Input } from '@angular/core';
import { languages } from 'src/app/models/languages';

@Component({
    selector: 'app-language-template-card',
    template: `
     <div  fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; 
    overflow: hidden;">
        <h4>Name : {{language.name}} </h4>
        <h4> Level : {{language.level}}</h4>
        </div> 


   `,

    styles: [
        `
        h4{
            font-weight : bold;
            color: green;
            letter-spacing : 1px;
            text-transform: uppercase;
        }
        
        `
    ]
})

export class LanguageTemplateComponent {

    @Input() language: languages
}