import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Invoice, InvoiceItem, TotalItem} from "../../../db/invoice.model";
import {Item} from "../../../db/item.model";
import {ItemService} from "../../../item/item.service";
import {InvoiceCalculateService} from "../../invoice-calculate.service";
import {ObjectListenerComponent} from "../../../object-listener.component";

@Component({
  selector: 'invoice-invoice-form-items',
  templateUrl: './invoice-form-items.component.html',
  styleUrls: ['../invoice-form.table.sass']
})
export class InvoiceFormItemsComponent extends ObjectListenerComponent<Invoice> {

  @Input() invoiceForm!: FormGroup;
  @Input() readonly!: boolean | undefined;
  @Input() row!: number;
  options: Item[] = [];

  constructor(private itemService: ItemService,
              private invoiceCalculateService: InvoiceCalculateService,
              private formBuilder: FormBuilder) {
    super();
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

  async objectChanged(object: Invoice | null) {
    this.options = await this.itemService.list();
    this.items.valueChanges.subscribe(items => this.itemsChanged(items));
    if (object) {
      object.items.forEach(() => this.addItem());
      this.invoiceForm.patchValue(object);
    }
  }

  itemsChanged(items: InvoiceItem[]) {
    this.totals.clear();
    const totals = this.invoiceCalculateService.calculateTotals(items);
    this.total?.setValue(totals[0].gross);
    totals.forEach(total => {
      this.totals.push(this.totalItem(total));
    });
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
}
