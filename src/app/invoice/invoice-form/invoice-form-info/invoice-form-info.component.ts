import {Component, Input, TemplateRef, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'invoice-invoice-form-info',
  templateUrl: './invoice-form-info.component.html'
})
export class InvoiceFormInfoComponent {

  @Input() invoiceForm!: FormGroup;
  @Input() readonly!: boolean | undefined;
  @Input() row!: number;
}
