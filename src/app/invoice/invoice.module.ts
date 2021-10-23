import {NgModule} from '@angular/core';
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {DockModule} from "../dock/dock.module";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "../layout/layout.module";

@NgModule({
  declarations: [
    YearsComponent,
    MonthsComponent,
    InvoiceListComponent
  ],
  imports: [
    LayoutModule,
    CommonModule,
    InvoiceRoutingModule,
    DockModule
  ]
})
export class InvoiceModule {
}
