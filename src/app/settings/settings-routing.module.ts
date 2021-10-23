import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
