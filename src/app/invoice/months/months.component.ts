import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InvoiceService} from "../invoice.service";
import {ContextMenuComponent} from "../../dock/context-menu/context-menu.component";

@Component({
  selector: 'invoice-months',
  templateUrl: './months.component.html'
})
export class MonthsComponent implements OnInit, OnDestroy {

  @ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;
  months: number[] = [];
  private sub: any;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      let year = +params['year'];
      this.months = await this.invoiceService.months(year);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
