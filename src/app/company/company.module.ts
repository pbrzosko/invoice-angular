import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyRoutingModule} from "./company-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CompanyListComponent} from "./company-list/company-list.component";
import {DockModule} from "../dock/dock.module";
import {CommonModule} from "@angular/common";
import {CompanyFormComponent} from "./company-form/company-form.component";

@NgModule({
  imports: [
    CommonModule,
    DockModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    LayoutModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyFormComponent,
    CompanyDetailComponent,
    CompanyListComponent
  ],
  exports: [
    CompanyFormComponent
  ]
})
export class CompanyModule {
}
