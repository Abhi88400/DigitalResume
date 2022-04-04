import { Component, Input } from '@angular/core';
import { objectives } from 'src/app/models/objectives';

@Component({
    selector: 'app-objective-template-component',
    template: `
     <h3>
      {{objectives.objective}}<br>
      {{objectives.date}}<br>
      {{objectives.place}}
    </h3>
    <p>{{objectives.declaration}}</p>
   `,

    styles: [`
    
    h3, span {
      text-transform: capitalize;
      color: #767270;
      margin-top: 5%;
    }`]
})

export class ObjectiveTemplateComponent {

@Input() objectives : objectives
}