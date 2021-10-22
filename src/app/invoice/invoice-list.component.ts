import {Component, OnDestroy, OnInit} from "@angular/core";
import {InvoiceService} from "./invoice.service";
import {ActivatedRoute} from "@angular/router";
import {Invoice} from "./invoice.model";

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
}
