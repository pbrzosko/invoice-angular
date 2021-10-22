import {Component, OnInit} from "@angular/core";
import {InvoiceService} from "../invoice.service";

@Component({
  selector: 'invoice-years',
  templateUrl: './years.component.html'
})
export class YearsComponent implements OnInit {

  years: number[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  async ngOnInit() {
    this.years = await this.invoiceService.years();
  }
}
