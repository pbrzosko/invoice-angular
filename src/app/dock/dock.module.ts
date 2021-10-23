import {NgModule} from "@angular/core";
import {DockComponent} from "./dock/dock.component";
import {DockItemComponent} from "./dock-item/dock-item.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    DockComponent,
    DockItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DockComponent,
    DockItemComponent
  ]
})
export class DockModule {
}
