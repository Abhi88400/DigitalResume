import { Component, Input } from '@angular/core';
import { references } from 'src/app/models/refrences';

@Component({
    selector: 'app-reference-template-component',
    template: `
    <h3 class="container">
      {{refrences.name}} <span style="text-transform: lowercase; font-size: 10pt;">@{{refrences.company}}</span><br>
      {{refrences.relationship}}<br>
      <span style="text-transform: lowercase">{{refrences.email}}</span><br>
      {{refrences.phone}}<br>
      {{refrences.address}}
    </h3>
   `,

    styles: [`  h3, span {
        text-transform: capitalize;
        color: #767270;
        margin-top: 5%;
      }`]
})

export class ReferenceTemplateComponent {

@Input() refrences :references
}