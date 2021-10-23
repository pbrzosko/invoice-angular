import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {Router} from "@angular/router";

@Component({
  selector: 'invoice-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  companyForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  })

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
    this.companyForm.patchValue(await this.companyService.getCompany());
  }

  async save() {
    if (this.companyForm.valid) {
      await this.companyService.save(this.companyForm.value);
      await this.router.navigate(['']);
    }
  }
}
