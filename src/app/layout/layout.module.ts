import {NgModule} from "@angular/core";
import {DetailLayoutComponent} from "./detail-layout/detail-layout.component";
import {GridLayoutComponent} from "./grid-layout/grid-layout.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    FlexLayoutModule
  ],
  declarations: [
    DetailLayoutComponent,
    GridLayoutComponent
  ],
  exports: [
    DetailLayoutComponent,
    GridLayoutComponent
  ]
})
export class LayoutModule {
}
