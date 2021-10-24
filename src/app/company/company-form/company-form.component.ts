import {Component, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-company-form',
  templateUrl: './company-form.component.html'
})
export class CompanyFormComponent {

  @Input() companyForm!: FormGroup;
  @Input() submitLabel: string = $localize `@@common.save:Save`;
  @Output() submit = new EventEmitter<any>();

  constructor(private location: Location) {
  }

  back(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.location.back();
  }

  submitForm(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit();
  }
}
