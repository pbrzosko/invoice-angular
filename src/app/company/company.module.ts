import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyRoutingModule} from "./company-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    LayoutModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyDetailComponent
  ],
  exports: [
  ]
})
export class CompanyModule {
}
