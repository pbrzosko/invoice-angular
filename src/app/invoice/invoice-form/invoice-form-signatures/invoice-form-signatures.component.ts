import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'invoice-invoice-form-signatures',
  templateUrl: './invoice-form-signatures.component.html',
  styleUrls: ['./invoice-form-signatures.component.sass']
})
export class InvoiceFormSignaturesComponent {

  @Input() invoiceForm!: FormGroup;
  @Input() row!: number;
}
