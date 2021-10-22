import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {InvoiceService} from "../invoice.service";

@Component({
  selector: 'invoice-months',
  templateUrl: './months.component.html'
})
export class MonthsComponent implements OnInit, OnDestroy {

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
