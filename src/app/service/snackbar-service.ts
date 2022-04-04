import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class snackBarService {



    constructor(private snackbarService: MatSnackBar) {

        
    }

    success(message: string, duration= 3500) {

        this.snackbarService.open(message, " ", { duration, panelClass: ['alert', 'alert-success'] })
    }
    decline(message: string, duration= 3500) {

        this.snackbarService.open(message, " ", { duration, panelClass: ['alert', 'alert-error'] })
    }
    message(message: string, duration= 3500) {

        this.snackbarService.open(message, " ", { duration, panelClass: ['alert'] })
    }
}