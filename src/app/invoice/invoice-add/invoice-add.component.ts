import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../db/invoice.model";
import {Subject} from "rxjs";

@Component({
  selector: 'invoice-invoice-add',
  templateUrl: './invoice-add.component.html'
})
export class InvoiceAddComponent implements OnInit {

  invoice$ = new Subject<Invoice | undefined>();

  constructor(
    private location: Location,
    private invoiceService: InvoiceService) {
  }

  async ngOnInit() {
    await Promise.resolve();
    this.invoice$.next(undefined);
    this.invoice$.complete();
  }

  async add(invoice: Invoice) {
    await this.invoiceService.add(invoice);
    this.location.back();
  }
}
