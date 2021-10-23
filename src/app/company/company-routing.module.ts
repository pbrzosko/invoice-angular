import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";

const routes: Routes = [
  {
    path: 'company',
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
