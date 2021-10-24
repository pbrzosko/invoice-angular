import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-company-add',
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent implements OnInit {

  companyForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  })

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private companyService: CompanyService) {
  }

  async ngOnInit() {
  }

  async add() {
    if (this.companyForm.valid) {
      await this.companyService.add(this.companyForm.value);
      this.location.back();
    }
  }
}
