import {Component, Input, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent {

  @Input() itemForm!: FormGroup;
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
