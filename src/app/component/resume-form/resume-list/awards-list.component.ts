import { Component, Input } from '@angular/core';
import { awardsAchivements } from 'src/app/models/award_achivements';
import { interests } from 'src/app/models/interests';

@Component({
    selector: 'app-awards-list',
    template: `

    <app-awards-card [resumeId]  = "resumeId"  *ngFor = "let FirstToLastAwards of AwardsList"  [AwardsCard] = "FirstToLastAwards" > </app-awards-card>
   `,  

    styles: []   
})

export class AwardsListComponent {

   @Input() AwardsList : awardsAchivements[]
    @Input() resumeId : string

}