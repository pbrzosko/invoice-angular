import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Invoice} from "../../db/invoice.model";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-add',
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent implements OnInit {

  company$ = new Subject<Company | undefined>();

  constructor(
    private location: Location,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
    await Promise.resolve();
    this.company$.next(undefined);
    this.company$.complete();
  }

  async add(company: Company) {
    await this.companyService.add(company);
    this.location.back();
  }
}
