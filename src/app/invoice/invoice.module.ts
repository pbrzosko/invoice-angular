import {NgModule} from '@angular/core';
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {DockModule} from "../dock/dock.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    YearsComponent,
    MonthsComponent,
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    InvoiceRoutingModule,
    DockModule
  ]
})
export class InvoiceModule {
}
