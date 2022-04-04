import { Component, Input } from '@angular/core';
import { interests } from 'src/app/models/interests';

@Component({
    selector: 'app-interest-list',
    template: `

    <app-interest-card [resumeId]  = "resumeId"  *ngFor = "let FirstToLastinterest of InterestList"  [InterestCard] = "FirstToLastinterest" > </app-interest-card>
   `,  

    styles: []
})

export class InterestListComponent {

   @Input() InterestList : interests[]
   @Input() resumeId : string

}