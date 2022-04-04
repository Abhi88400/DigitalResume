import { Component, Input } from '@angular/core';
import { awardsAchivements } from 'src/app/models/award_achivements';

@Component({
    selector: 'app-awards-template-component',
    template: `
     <ul>
      <li>
        <div fxLayout="row" fxLayoutGap="10px">
          <span class="hack">{{Awards.awards_and_achivements}}</span>
        </div>
      </li>
    </ul>
   `,

    styles: [`   ul {
        color: #767270;
        font-weight: bold;
        font-size: 16px;
      }
  
      ul li {
        vertical-align: top;
        margin-bottom: 5px;
      }`]
})

export class AwardsTemplateComponent {
@Input() Awards:awardsAchivements

}