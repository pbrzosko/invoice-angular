import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {YearsComponent} from "./invoice/years/years.component";
import {MonthsComponent} from "./invoice/months/months.component";
import {InvoiceListComponent} from "./invoice/invoice-list/invoice-list.component";
import {DockItemComponent} from "./dock/dock-item/dock-item.component";
import {DockComponent} from "./dock/dock/dock.component";

@NgModule({
  declarations: [
    AppComponent,
    YearsComponent,
    MonthsComponent,
    InvoiceListComponent,
    DockItemComponent,
    DockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
