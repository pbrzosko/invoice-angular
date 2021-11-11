import {Component, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {Item} from "../../db/item.model";
import {ObjectListenerComponent} from "../../object-listener.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'invoice-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent extends ObjectListenerComponent<Item> {

  @Input() submitLabel: string = this.t.instant('common.save');
  @Output() submit = new EventEmitter<Item>();

  itemForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    unit: [null, [Validators.required]],
    price: [null, [Validators.required]],
    tax: [null, [Validators.required]]
  })

  constructor(private location: Location,
              private formBuilder: FormBuilder,
              private t: TranslateService) {
    super();
  }

  objectChanged(object: Item | null) {
    if (object) {
      this.itemForm.addControl('id', new FormControl(null, [Validators.required]));
      this.itemForm.patchValue(object);
      this.itemForm.get('name')?.disable();
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
    this.submit.emit(this.itemForm.value);
  }
}
