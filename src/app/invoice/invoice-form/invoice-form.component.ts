import {Component, Input, Output} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../db/invoice.model";
import {ObjectListenerComponent} from "../../object-listener.component";

@Component({
  selector: 'invoice-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass']
})
export class InvoiceFormComponent extends ObjectListenerComponent<Invoice> {

  @Input() submitLabel: string = $localize`@@common.save:Save`;
  @Output() submit = new EventEmitter<Invoice>();
  @Output() export = new EventEmitter<Invoice>();

  invoiceForm: FormGroup = this.formBuilder.group({
    id: [null, [Validators.required]],
    month: [null, [Validators.required]],
    year: [null, [Validators.required]],
    issueDate: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    paymentDate: [null, [Validators.required]],
    seller: [null, [Validators.required]],
    buyer: [null, [Validators.required]],
    items: this.formBuilder.array([], [Validators.required]),
    totals: this.formBuilder.array([]),
    total: [{value: 0, disabled: true}]
  });

  readonly: boolean | undefined;

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private invoiceService: InvoiceService) {
    super();
  }

  objectChanged(object: Invoice | null) {
    if (object) {
      this.readonly = true;
    } else {
      this.readonly = false;
      this.invoiceForm.get('issueDate')?.valueChanges.subscribe(issueDate => this.issueDateChanged(issueDate));
      // setup initial dates
      const now = new Date().toISOString().split('T')[0];
      this.invoiceForm.get('issueDate')?.setValue(now);
      this.invoiceForm.get('invoiceDate')?.setValue(now);
    }
  }

  get items() {
    return (this.invoiceForm.get('items') as FormArray).length;
  }

  get totals() {
    return (this.invoiceForm.get('totals') as FormArray).length;
  }

  get loaded() {
    return this.readonly !== undefined;
  }

  async issueDateChanged(issueDate: string) {
    const date = new Date(issueDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const next = await this.invoiceService.nextId(year, month);
    this.invoiceForm.get('year')?.setValue(year);
    this.invoiceForm.get('month')?.setValue(month);
    this.invoiceForm.get('id')?.setValue(next);
    date.setDate(date.getDate() + 14);
    this.invoiceForm.get('paymentDate')?.setValue(date.toISOString().split('T')[0]);
  }

  back(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.readonly) {
      this.export.emit(this.invoiceForm.value);
    } else {
      this.submit.emit(this.invoiceForm.value);
    }
  }
}
