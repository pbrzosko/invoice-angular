import {Component, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {CompanyService} from "../../company/company.service";
import {ItemService} from "../../item/item.service";
import {SettingsService} from "../../settings/settings.service";
import {Company} from "../../company/company.model";
import {Item} from "../../item/item.model";
import {Invoice} from "../invoice.model";

@Component({
  selector: 'invoice-invoice-form',
  templateUrl: './invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit {

  @Input() submitLabel: string = $localize `@@common.save:Save`;
  @Output() submit = new EventEmitter<Invoice>();

  invoiceForm: FormGroup = this.formBuilder.group({
    issueDate: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    buyer: [null, [Validators.required]],
    items: this.formBuilder.array([], [Validators.required])
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
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
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
        netControl.setValue(value.price * qtyControl.value);
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
