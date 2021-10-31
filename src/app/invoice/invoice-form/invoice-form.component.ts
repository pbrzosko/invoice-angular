import {Component, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {CompanyService} from "../../company/company.service";
import {ItemService} from "../../item/item.service";
import {SettingsService} from "../../settings/settings.service";
import {Company} from "../../company/company.model";
import {Item} from "../../item/item.model";
import {Invoice, InvoiceItem} from "../invoice.model";

@Component({
  selector: 'invoice-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.sass']
})
export class InvoiceFormComponent implements OnInit {

  @Input() submitLabel: string = $localize`@@common.save:Save`;
  @Output() submit = new EventEmitter<Invoice>();

  invoiceForm: FormGroup = this.formBuilder.group({
    issueDate: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    buyer: [null, [Validators.required]],
    items: this.formBuilder.array([], [Validators.required]),
    totals: this.formBuilder.array([]),
    total: [{value: null, disabled: true}]
  });

  companies: Company[] = [];
  options: Item[] = [];
  seller!: Company;

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private companyService: CompanyService,
              private itemService: ItemService,
              private settingsSerivce: SettingsService) {
  }

  async ngOnInit() {
    this.seller = await this.settingsSerivce.getSettings();
    this.companies = await this.companyService.list();
    this.options = await this.itemService.list();
    this.items.valueChanges.subscribe(items => this.itemsChanged(items));
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  get totals(): FormArray {
    return this.invoiceForm.get('totals') as FormArray;
  }

  get total() {
    const value = this.invoiceForm.get('total')?.value;
    return value ? value : 0;
  }

  get totalString() {
    return this.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 12, useGrouping: false});
  }

  totalSubstring(offset: number, length: number = 3) {
    const totalString = this.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, minimumIntegerDigits: 12, useGrouping: false});
    return parseInt(totalString.substr(totalString.length - offset, length));
  }

  get millions() {
    return this.totalSubstring(12);
  }

  get thousands() {
    return this.totalSubstring(9);
  }

  get ones() {
    return this.totalSubstring(6);
  }

  get fraction() {
    return this.totalSubstring(2, 2);
  }

  itemsChanged(items: InvoiceItem[]) {
    const taxes = items.reduce<Map<number, number>>((accumulator, current) => {
      if (current.item && current.qty) {
        const currentTax = accumulator.get(current.item.tax);
        const price = current.item.price * current.qty;
        if (currentTax) {
          accumulator.set(current.item.tax, currentTax + price);
        } else {
          accumulator.set(current.item.tax, price);
        }
      }
      return accumulator;
    }, new Map());
    const total = {
      net: 0,
      tax: 0,
      gross: 0
    };
    this.totals.clear();
    taxes.forEach((value, key) => {
      const label = this.totals.length === 0 ? 'W tym' : '';
      const tax = (value * key / 100);
      total.net += value;
      total.tax += tax;
      total.gross += value + tax;
      this.totals.push(this.totalItem(label, value, key + '%', tax, value + tax));
    });
    this.totals.insert(0, this.totalItem('Razem', total.net, 'X', total.tax, total.gross));
    this.invoiceForm.get('total')?.setValue(total.gross);
  }

  totalItem(label: string, net: number, rate: string, tax: number, gross: number) {
    return this.formBuilder.group({
      label: [{value: label, disabled: true}],
      net: [{value: net, disabled: true}],
      rate: [{value: rate, disabled: true}],
      tax: [{value: tax, disabled: true}],
      gross: [{value: gross, disabled: true}]
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
    this.submit.emit(this.invoiceForm.value);
  }
}
