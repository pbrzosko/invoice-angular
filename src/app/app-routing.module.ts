import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YearsComponent} from "./invoice/years.component";
import {MonthsComponent} from "./invoice/months.component";
import {InvoiceListComponent} from "./invoice/invoice-list.component";

const routes: Routes = [
  {
    path: '',
    component: YearsComponent
  },
  {
    path: ':year',
    component: MonthsComponent,
  },
  {
    path: ':year/:month',
    component: InvoiceListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
