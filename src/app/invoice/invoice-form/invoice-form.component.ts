import {Component, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {CompanyService} from "../../company/company.service";
import {ItemService} from "../../item/item.service";
import {SettingsService} from "../../settings/settings.service";
import {InvoiceService} from "../invoice.service";
import {InvoicePdfService} from "../invoice-pdf.service";
import {InvoiceCalculateService} from "../invoice-calculate.service";
import {Invoice, InvoiceItem, TotalItem} from "../../db/invoice.model";
import {Company} from "../../db/company.model";
import {Item} from "../../db/item.model";
import {Subject} from "rxjs";

@Component({
  selector: 'invoice-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass']
})
export class InvoiceFormComponent implements OnInit {

  @Input() invoice$!: Subject<Invoice | undefined>;
  @Input() submitLabel: string = $localize`@@common.save:Save`;
  @Output() submit = new EventEmitter<Invoice>();
  @Output() export = new EventEmitter<Invoice>();

  invoiceForm: FormGroup = this.formBuilder.group({
    id: [null, [Validators.required]],
    month: [null, [Validators.required]],
    year: [null, [Validators.required]],
    issueDate: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    seller: [null, [Validators.required]],
    buyer: [null, [Validators.required]],
    items: this.formBuilder.array([], [Validators.required]),
    totals: this.formBuilder.array([]),
    total: [{value: 0, disabled: true}]
  });

  readonly: boolean | undefined;
  companies: Company[] = [];
  options: Item[] = [];
  seller!: Company;

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private itemService: ItemService,
              private settingsSerivce: SettingsService,
              private invoiceService: InvoiceService,
              private invoicePdfService: InvoicePdfService,
              private invoiceCalculateService: InvoiceCalculateService) {
  }

  ngOnInit() {
    const subscription = this.invoice$.subscribe(async invoice => {
      this.seller = await this.settingsSerivce.getSettings();
      this.invoiceForm.get('seller')?.setValue(this.seller);
      this.companies = await this.companyService.list();
      this.options = await this.itemService.list();
      this.items.valueChanges.subscribe(items => this.itemsChanged(items));
      if (invoice) {
        await this.initExistingInvoice(invoice);
      } else {
        await this.initNewInvoice();
      }
      subscription.unsubscribe();
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  get totals(): FormArray {
    return this.invoiceForm.get('totals') as FormArray;
  }

  get total() {
    return this.invoiceForm.get('total');
  }

  get loaded() {
    return this.readonly !== undefined;
  }

  async initExistingInvoice(invoice: Invoice) {
    this.readonly = true;
    invoice.items.forEach(() => this.addItem());
    this.invoiceForm.patchValue(invoice);
  }

  async initNewInvoice() {
    this.readonly = false;
    this.invoiceForm.get('issueDate')?.valueChanges.subscribe(issueDate => this.issueDateChanged(issueDate));
    // setup initial dates
    const now = new Date().toISOString().split('T')[0];
    this.invoiceForm.get('issueDate')?.setValue(now);
    this.invoiceForm.get('invoiceDate')?.setValue(now);
  }

  itemsChanged(items: InvoiceItem[]) {
    this.totals.clear();
    const totals = this.invoiceCalculateService.calculateTotals(items);
    this.total?.setValue(totals[0].gross);
    totals.forEach(total => {
      this.totals.push(this.totalItem(total));
    });
  }

  async issueDateChanged(issueDate: string) {
    const date = new Date(issueDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const next = await this.invoiceService.nextId(year, month);
    this.invoiceForm.get('year')?.setValue(year);
    this.invoiceForm.get('month')?.setValue(month);
    this.invoiceForm.get('id')?.setValue(next);
  }

  totalItem(total: TotalItem) {
    return this.formBuilder.group({
      label: [{value: total.label, disabled: true}],
      net: [{value: total.net, disabled: true}],
      rate: [{value: total.rate, disabled: true}],
      tax: [{value: total.tax, disabled: true}],
      gross: [{value: total.gross, disabled: true}]
    });
  }

  addItem() {
    const itemControl = new FormControl(null, Validators.required);
    const qtyControl = new FormControl(null, Validators.required);
    const priceControl = new FormControl({value: null, disabled: true});
    const netControl = new FormControl({value: null, disabled: true});
    const rateControl = new FormControl({value: null, disabled: true});
    const taxControl = new FormControl({value: null, disabled: true});
    const grossControl = new FormControl({value: null, disabled: true});
    const group = new FormGroup({
      item: itemControl,
      qty: qtyControl,
      price: priceControl,
      net: netControl,
      rate: rateControl,
      tax: taxControl,
      gross: grossControl
    })
    itemControl.valueChanges.subscribe(value => {
      priceControl.setValue(value.price);
      rateControl.setValue(value.tax);
    });
    qtyControl.valueChanges.subscribe(value => {
      if (priceControl.value) {
        netControl.setValue(value * priceControl.value);
      }
    })
    priceControl.valueChanges.subscribe(value => {
      if (qtyControl.value) {
        netControl.setValue(value * qtyControl.value);
      }
    });
    rateControl.valueChanges.subscribe(value => {
      if (netControl.value) {
        taxControl.setValue(value * netControl.value / 100);
      }
    });
    netControl.valueChanges.subscribe(value => {
      if (rateControl.value) {
        taxControl.setValue(value * rateControl.value / 100);
      }
      if (taxControl.value) {
        grossControl.setValue(value + taxControl.value);
      }
    });
    taxControl.valueChanges.subscribe(value => {
      if (netControl.value) {
        grossControl.setValue(value + netControl.value);
      }
    })
    this.items.push(group);
  }

  deleteItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
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
