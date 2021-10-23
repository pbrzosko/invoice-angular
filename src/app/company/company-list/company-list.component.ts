import {Component, OnInit} from "@angular/core";
import {Company} from "../company.model";
import {CompanyService} from "../company.service";

@Component({
  selector: 'invoice-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService) {
  }

  async ngOnInit() {
    this.companies = await this.companyService.list();
  }
}
