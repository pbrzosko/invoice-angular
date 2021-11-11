import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'invoice-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.sass']
})
export class ConfirmationDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
