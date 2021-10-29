import {Component, OnInit, ViewChild} from "@angular/core";
import {InvoiceService} from "../invoice.service";
import {ContextMenuComponent} from "../../dock/context-menu/context-menu.component";

@Component({
  selector: 'invoice-years',
  templateUrl: './years.component.html',
})
export class YearsComponent implements OnInit {

  @ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;
  years: number[] = [];

  constructor(private invoiceService: InvoiceService) {
  }

  async ngOnInit() {
    this.years = await this.invoiceService.years();
  }
}
