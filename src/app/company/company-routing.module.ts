import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyListComponent} from "./company-list/company-list.component";

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyListComponent,
  },
  {
    path: 'companies/add',
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
