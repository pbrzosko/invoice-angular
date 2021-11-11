import {Component, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {Company} from "../../db/company.model";
import {ObjectListenerComponent} from "../../object-listener.component";

@Component({
  selector: 'invoice-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent extends ObjectListenerComponent<Company>{

  @Input() disableName = true;
  @Input() submitLabel: string = $localize `:@@common.save:Save`;
  @Output() submit = new EventEmitter<Company>();

  companyForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    accountNumber: [null, [Validators.required]],
    street: [null, [Validators.required]],
    zip: [null, [Validators.required]],
    city: [null, [Validators.required]],
    tin: [null, [Validators.required]],
  });

  constructor(private location: Location,
              private formBuilder: FormBuilder) {
    super();
  }

  objectChanged(object: Company | null) {
    if (object) {
      this.companyForm.addControl('id', new FormControl(null, [Validators.required]));
      this.companyForm.patchValue(object);
      if (this.disableName) {
        this.companyForm.get('name')?.disable();
      }
    }
  }

  back(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.companyForm.value);
  }
}
