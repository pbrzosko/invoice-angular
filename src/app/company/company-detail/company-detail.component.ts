import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'invoice-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent {

  companyForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  })

  constructor(private formBuilder: FormBuilder) {
  }

  save() {
    if (!this.companyForm.valid) {
      return;
    }
  }
}
