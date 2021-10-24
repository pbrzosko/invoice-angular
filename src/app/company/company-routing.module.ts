import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompanyDetailComponent} from "./company-detail/company-detail.component";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CompanyAddComponent} from "./company-add/company-add.component";

const routes: Routes = [
  {
    path: 'companies',
    component: CompanyListComponent,
  },
  {
    path: 'companies/add',
    component: CompanyAddComponent
  },
  {
    path: 'companies/:id',
    component: CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
