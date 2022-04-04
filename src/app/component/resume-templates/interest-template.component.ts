import { Component, Input } from '@angular/core';
import { interests } from 'src/app/models/interests';

@Component({
    selector: 'app-interest-template-component',
    template: `
      <ul style="list-style-type: square">
      <li>
        <div fxLayout="row" fxLayoutGap="10px">
          <span class="hack">{{interest.interest}}</span>
        </div>
      </li>
    </ul>
   `,

    styles: [`  ul {
        color: #767270;
        font-weight: bold;
        font-size: 16px;
        word-break: break-word;
      }
  
      ul li {
        vertical-align: top;
        margin-bottom: 5px;
      }`]
})

export class InterestTemplateComponent {
@Input() interest : interests

}