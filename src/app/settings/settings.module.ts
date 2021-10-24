import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";
import {CompanyModule} from "../company/company.module";

@NgModule({
  imports: [
    FlexLayoutModule,
    LayoutModule,
    CompanyModule,
    SettingsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
  ]
})
export class SettingsModule {
}
