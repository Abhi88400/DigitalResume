import { Component, Input } from '@angular/core';
import { skills } from 'src/app/models/skills';

@Component({
    selector: 'app-skill-template-component',
    template: `
     <div  fxLayout = "row" fxLayout = "center center" fxLayoutGap = "1rem" style=" word-wrap : break-word; 
    overflow: hidden;">
        <h4> skills :  {{skill.skill}} </h4>
        <h4> level : {{skill.level}} </h4>
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

export class SkillTemplateComponent {

    @Input() skill: skills
}