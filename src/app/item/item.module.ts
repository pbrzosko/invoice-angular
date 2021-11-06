import {NgModule} from "@angular/core";
import {LayoutModule} from "../layout/layout.module";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {ItemRoutingModule} from "./item-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ItemListComponent} from "./item-list/item-list.component";
import {DockModule} from "../dock/dock.module";
import {CommonModule} from "@angular/common";
import {ItemFormComponent} from "./item-form/item-form.component";
import {ItemAddComponent} from "./item-add/item-add.component";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  imports: [
    CommonModule,
    DockModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    LayoutModule,
    ItemRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ItemFormComponent,
    ItemAddComponent,
    ItemDetailComponent,
    ItemListComponent
  ],
  exports: [
    ItemFormComponent
  ]
})
export class ItemModule {
}
