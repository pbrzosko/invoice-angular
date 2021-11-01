import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../invoice.model";

@Component({
  selector: 'invoice-invoice-add',
  templateUrl: './invoice-add.component.html'
})
export class InvoiceAddComponent {

  constructor(
    private location: Location,
    private invoiceService: InvoiceService) {
  }

  async add(invoice: Invoice) {
    //await this.invoiceService.add(this.invoiceForm.value);
    console.log('Saving invoice', invoice);
    // this.location.back();
  }
}
