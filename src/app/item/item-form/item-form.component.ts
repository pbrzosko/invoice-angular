import {Component, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Item} from "../../db/item.model";

@Component({
  selector: 'invoice-item-form',
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit {

  @Input() item$!: Subject<Item | undefined>;
  @Input() submitLabel: string = $localize `@@common.save:Save`;
  @Output() submit = new EventEmitter<Item>();

  itemForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    unit: [null, [Validators.required]],
    price: [null, [Validators.required]],
    tax: [null, [Validators.required]]
  })

  constructor(private location: Location,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const subscription = this.item$.subscribe(item => {
      if (item) {
        this.itemForm.addControl('id', new FormControl(null, [Validators.required]));
        this.itemForm.patchValue(item);
        this.itemForm.get('name')?.disable();
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
    this.submit.emit(this.itemForm.value);
  }
}
