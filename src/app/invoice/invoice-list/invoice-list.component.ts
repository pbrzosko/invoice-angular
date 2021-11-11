import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../db/invoice.model";
import {ContextMenuComponent} from "../../dock/context-menu/context-menu.component";

@Component({
  selector: 'invoice-invoice-list',
  templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;
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
    await this.invoiceService.delete(invoice.year, invoice.month, invoice.id);
    await this.ngOnInit();
  }
}
