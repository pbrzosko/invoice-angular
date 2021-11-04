import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../db/invoice.model";

@Component({
  selector: 'invoice-invoice-list',
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  invoices: Invoice[] = [];
  private sub: any;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      let year = +params['year'];
      let month = +params['month'];
      this.invoices = await this.invoiceService.find(year, month);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async delete(invoice: Invoice) {
    //await this.invoiceService.delete(invoice.id);
    await this.ngOnInit();
  }
}
