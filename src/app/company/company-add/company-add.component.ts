import {Component} from "@angular/core";
import {CompanyService} from "../company.service";
import {Location} from "@angular/common";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-add',
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent {

  constructor(
    private location: Location,
    private companyService: CompanyService) {
  }

  async add(company: Company) {
    await this.companyService.add(company);
    this.location.back();
  }
}
