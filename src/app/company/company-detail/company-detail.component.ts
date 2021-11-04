import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  companyForm: FormGroup = this.formBuilder.group({
    id: [null, [Validators.required]],
    name: [null, [Validators.required]],
    accountNumber: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  })

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    let company = await this.companyService.get(parseInt(id, 10));
    if (company) {
      this.companyForm.patchValue(company);
    }
  }

  async save() {
    if (this.companyForm.valid) {
      await this.companyService.update(this.companyForm.value);
      this.location.back();
    }
  }
}
