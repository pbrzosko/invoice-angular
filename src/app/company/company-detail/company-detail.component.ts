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
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected companyService: CompanyService) {
  }

  async ngOnInit() {
  }

  async save() {
    if (this.companyForm.valid) {
      await this.companyService.add(this.companyForm.value);
      await this.router.navigate(['companies']);
    }
  }
}
