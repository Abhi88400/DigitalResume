import { Component, Input } from '@angular/core';
import { Resume } from 'src/app/models/resume';
import { skills } from 'src/app/models/skills';

@Component({
    selector: 'app-skill-list',
    template: `
    <app-skill-card [resumeId]  = "resumeId" *ngFor = "let FirstToLastSkills of SkillList" [SkillCard] = "FirstToLastSkills" > </app-skill-card>
   `,  

    styles: []
})

export class SkillListComponent {

    @Input() SkillList : skills[]
    @Input() resumeId : string

}