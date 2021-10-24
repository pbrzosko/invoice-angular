import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../item.service";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

  itemForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    unit: [null, [Validators.required]],
    price: [null, [Validators.required]],
    tax: [null, [Validators.required]]
  })

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async ngOnInit() {
  }

  async add() {
    if (this.itemForm.valid) {
      await this.itemService.add(this.itemForm.value);
      this.location.back();
    }
  }
}
