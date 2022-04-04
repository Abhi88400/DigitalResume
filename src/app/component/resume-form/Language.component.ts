import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { languages } from 'src/app/models/languages';
import { Resume } from 'src/app/models/resume';
import { LanguageDialogueComponent } from './resume-dialogues/Language-dialogue.component';

@Component({
    selector: 'app-language',
    template: `
    <div *ngIf = "this.Language">
    <app-language-list [resumeId]= "this.resumeId" [LanguageList] = "this.Language">   </app-language-list>     
    </div>


<div fxLayout= "column" fxLayoutAlign = "start stretch"> 
        <button (click) = "OpenWeaknessDialog()" mat-raised-button color = "accent">  
        Add Interest

        </button> 

</div>
   `,

    styles: []
})

export class LanguageComponent {

    @Input() resumeId: string;
    @Input() Language: languages;

    constructor(public dialogRef: MatDialog) {

    }

    OpenWeaknessDialog() {

        this.dialogRef.open(LanguageDialogueComponent,
            {
                height: '36%',
                width: '90%',
                data: { ResumeId: this.resumeId }, disableClose: true
            }
        )
    }
}