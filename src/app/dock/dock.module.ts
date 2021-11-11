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
import {PageHeaderComponent} from "./page-header/page-header.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DockComponent,
    DockItemComponent,
    ContextMenuComponent,
    ConfirmationDialog,
    PageHeaderComponent
  ],
  imports: [
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  exports: [
    DockComponent,
    DockItemComponent,
    ContextMenuComponent,
    PageHeaderComponent
  ]
})
export class DockModule {
}
