import {Component, OnInit} from "@angular/core";
import {InvoiceService} from "./invoice.service";

@Component({
  selector: 'invoice-years',
  templateUrl: './years.component.html'
})
export class YearsComponent implements OnInit {

  years: Number[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  async ngOnInit() {
    this.years = await this.invoiceService.years();
  }
}
