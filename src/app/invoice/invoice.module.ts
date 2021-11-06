import {NgModule} from '@angular/core';
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {DockModule} from "../dock/dock.module";
import {CommonModule} from "@angular/common";
import {LayoutModule} from "../layout/layout.module";
import {InvoiceFormComponent} from "./invoice-form/invoice-form.component";
import {InvoiceAddComponent} from "./invoice-add/invoice-add.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {CurrencyToWordsPipe} from "./currency-to-words.pipe";
import {InvoiceDetailComponent} from "./invoice-detail/invoice-detail.component";

@NgModule({
  declarations: [
    YearsComponent,
    MonthsComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoiceAddComponent,
    InvoiceDetailComponent,
    CurrencyToWordsPipe
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LayoutModule,
    CommonModule,
    InvoiceRoutingModule,
    DockModule,
    ReactiveFormsModule
  ]
})
export class InvoiceModule {
}
