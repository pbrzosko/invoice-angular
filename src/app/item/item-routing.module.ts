import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {ItemListComponent} from "./item-list/item-list.component";
import {ItemAddComponent} from "./item-add/item-add.component";

const routes: Routes = [
  {
    path: 'items',
    component: ItemListComponent,
  },
  {
    path: 'items/add',
    component: ItemAddComponent
  },
  {
    path: 'items/:id',
    component: ItemDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
