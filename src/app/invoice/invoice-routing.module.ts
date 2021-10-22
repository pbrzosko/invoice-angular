import {RouterModule, Routes} from "@angular/router";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'invoices',
    component: YearsComponent
  },
  {
    path: 'invoices/:year',
    component: MonthsComponent,
  },
  {
    path: 'invoices/:year/:month',
    component: InvoiceListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
