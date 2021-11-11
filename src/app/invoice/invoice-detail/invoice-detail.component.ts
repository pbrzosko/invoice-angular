import {Component} from "@angular/core";
import {InvoiceService} from "../invoice.service";
import {Invoice} from "../../db/invoice.model";
import {InvoicePdfService} from "../invoice-pdf.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'invoice-invoice-detail',
  templateUrl: './invoice-detail.component.html'
})
export class InvoiceDetailComponent {

  invoice: Invoice | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private invoicePdfService: InvoicePdfService) {
  }

  async ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    const month = parseInt(this.route.snapshot.paramMap.get('month')!, 10);
    const year = parseInt(this.route.snapshot.paramMap.get('year')!, 10);
    this.invoice = await this.invoiceService.get(year, month, id);
  }

  async export(invoice: Invoice) {
    this.invoicePdfService.saveInvoice(invoice);
  }
}
