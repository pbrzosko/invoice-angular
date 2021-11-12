import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {InvoiceModule} from "./invoice/invoice.module";
import {DockModule} from "./dock/dock.module";
import {CompanyModule} from "./company/company.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SettingsModule} from "./settings/settings.module";
import {ItemModule} from "./item/item.module";
import {NgxMaskModule} from "ngx-mask";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {JsonLoader} from "./locale/locale.loader";
import '@angular/common/locales/global/pl';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    InvoiceModule,
    CompanyModule,
    ItemModule,
    SettingsModule,
    DockModule,
    MatToolbarModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useClass: JsonLoader
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
