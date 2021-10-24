import {NgModule} from "@angular/core";
import {DockComponent} from "./dock/dock.component";
import {DockItemComponent} from "./dock-item/dock-item.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    DockComponent,
    DockItemComponent,
    ContextMenuComponent
  ],
  imports: [
    MatMenuModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    DockComponent,
    DockItemComponent,
    ContextMenuComponent
  ]
})
export class DockModule {
}
