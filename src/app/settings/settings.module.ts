import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";
import {CompanyModule} from "../company/company.module";
import {DockModule} from "../dock/dock.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    FlexLayoutModule,
    LayoutModule,
    CompanyModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    DockModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [
    SettingsComponent
  ],
  exports: [
  ]
})
export class SettingsModule {
}
