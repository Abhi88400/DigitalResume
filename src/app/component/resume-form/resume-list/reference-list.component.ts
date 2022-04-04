import { Component, Input } from '@angular/core';
import { references } from 'src/app/models/refrences';


@Component({
    selector: 'app-reference-list',
    template: `

<app-reference-card [resumeId]  = "resumeId"  *ngFor = "let FirstToLastReference of referenceList " [referenceCard] = "FirstToLastReference">  </app-reference-card>

   `,

    styles: []
})

export class ReferenceListComponent {

    @Input() referenceList: references[];
    @Input() resumeId : string
}
