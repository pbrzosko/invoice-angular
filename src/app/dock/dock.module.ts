import {NgModule} from "@angular/core";
import {DockComponent} from "./dock/dock.component";
import {DockItemComponent} from "./dock-item/dock-item.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ContextMenuComponent} from "./context-menu/context-menu.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmationDialog} from "./confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    DockComponent,
    DockItemComponent,
    ContextMenuComponent,
    ConfirmationDialog
  ],
  imports: [
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
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
