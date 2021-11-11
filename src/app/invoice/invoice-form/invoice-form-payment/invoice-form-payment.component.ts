import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'invoice-invoice-form-payment',
  templateUrl: './invoice-form-payment.component.html'
})
export class InvoiceFormPaymentComponent {

  @Input() invoiceForm!: FormGroup;
  @Input() row!: number | string;
}
