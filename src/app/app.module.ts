import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {YearsComponent} from "./invoice/years.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {DockItemComponent} from "./dock/dock-item.component";
import {MatCardModule} from "@angular/material/card";
import {DockComponent} from "./dock/dock.component";

@NgModule({
  declarations: [
    AppComponent,
    YearsComponent,
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
