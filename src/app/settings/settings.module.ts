import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SettingsComponent} from "./settings/settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    LayoutModule,
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
