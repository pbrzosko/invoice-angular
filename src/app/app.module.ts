import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {YearsComponent} from "./invoice/years.component";
import {FolderComponent} from "./invoice/folder.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {FolderIconComponent} from "./icons/folder-icon.component";

@NgModule({
  declarations: [
    AppComponent,
    YearsComponent,
    FolderComponent,
    FolderIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
