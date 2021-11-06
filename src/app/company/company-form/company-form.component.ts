import {Component, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Company} from "../../db/company.model";

@Component({
  selector: 'invoice-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent implements OnInit {

  @Input() disableName = true;
  @Input() company$!: Subject<Company | undefined>;
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
  readonly: boolean | undefined;

  constructor(private location: Location,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const subscription = this.company$.subscribe(company => {
      if (company) {
        this.readonly = true;
        this.companyForm.addControl('id', new FormControl(null, [Validators.required]));
        this.companyForm.patchValue(company);
        if (this.disableName) {
          this.companyForm.get('name')?.disable();
        }
      } else {
        this.readonly = false;
      }
      subscription.unsubscribe();
    });
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
