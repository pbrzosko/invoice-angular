import {Component, OnInit} from "@angular/core";
import {CompanyService} from "../company.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  company$ = new Subject<Company | undefined>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const company = await this.companyService.get(parseInt(id, 10));
    this.company$.next(company);
    this.company$.complete();
  }

  async save(company: Company) {
    await this.companyService.update(company);
    this.location.back();
  }
}
