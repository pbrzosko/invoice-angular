import {Component, Input} from "@angular/core";
import {FormArray, FormGroup} from "@angular/forms";

@Component({
  selector: 'invoice-invoice-form-totals',
  templateUrl: './invoice-form-totals.component.html',
  styleUrls: ['../invoice-form.table.sass']
})
export class InvoiceFormTotalsComponent {

  @Input() invoiceForm!: FormGroup;
  @Input() row!: number;

  get totals(): FormArray {
    return this.invoiceForm.get('totals') as FormArray;
  }

  get total() {
    return this.invoiceForm.get('total');
  }
}
