import {RouterModule, Routes} from "@angular/router";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {NgModule} from "@angular/core";
import {InvoiceAddComponent} from "./invoice-add/invoice-add.component";
import {InvoiceDetailComponent} from "./invoice-detail/invoice-detail.component";

const routes: Routes = [
  {
    path: 'invoices',
    component: YearsComponent
  },
  {
    path: 'invoices/add',
    component: InvoiceAddComponent
  },
  {
    path: 'invoices/:year',
    component: MonthsComponent,
  },
  {
    path: 'invoices/:year/:month',
    component: InvoiceListComponent
  },
  {
    path: 'invoices/:year/:month/:id',
    component: InvoiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
