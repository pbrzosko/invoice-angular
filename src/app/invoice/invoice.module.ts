import {NgModule} from '@angular/core';
import {InvoiceRoutingModule} from "./invoice-routing.module";
import {YearsComponent} from "./years/years.component";
import {MonthsComponent} from "./months/months.component";
import {InvoiceListComponent} from "./invoice-list/invoice-list.component";
import {DockModule} from "../dock/dock.module";
import {CommonModule, CurrencyPipe} from "@angular/common";
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
import {InvoiceFormInfoComponent} from "./invoice-form/invoice-form-info/invoice-form-info.component";
import {InvoiceFormItemsComponent} from "./invoice-form/invoice-form-items/invoice-form-items.component";
import {InvoiceFormPaymentComponent} from "./invoice-form/invoice-form-payment/invoice-form-payment.component";
import {InvoiceFormSignaturesComponent} from "./invoice-form/invoice-form-signatures/invoice-form-signatures.component";
import {InvoiceFormTotalsComponent} from "./invoice-form/invoice-form-totals/invoice-form-totals.component";
import {InvoiceFormPartiesComponent} from "./invoice-form/invoice-form-parties/invoice-form-parties.component";
import {InvoiceFormSpacingComponent} from "./invoice-form/invoice-form-spacing/invoice-form-spacing.component";
import {MaskPipe, NgxMaskModule} from "ngx-mask";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    YearsComponent,
    MonthsComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoiceFormInfoComponent,
    InvoiceFormPartiesComponent,
    InvoiceFormItemsComponent,
    InvoiceFormPaymentComponent,
    InvoiceFormSignaturesComponent,
    InvoiceFormTotalsComponent,
    InvoiceFormSpacingComponent,
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
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    TranslateModule.forChild({
      extend: true
    })
  ],
  providers: [
    CurrencyToWordsPipe,
    CurrencyPipe,
    MaskPipe
  ]
})
export class InvoiceModule {
}
