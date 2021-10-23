import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyRoutingModule} from "./company-routing.module";

@NgModule({
  imports: [
    LayoutModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyDetailComponent
  ],
  exports: [
  ]
})
export class CompanyModule {
}
