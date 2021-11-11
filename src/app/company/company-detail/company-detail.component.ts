import {Component, OnInit} from "@angular/core";
import {CompanyService} from "../company.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  company: Company | undefined;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.company = await this.companyService.get(parseInt(id, 10));
  }

  async save(company: Company) {
    await this.companyService.update(company);
    this.location.back();
  }
}
