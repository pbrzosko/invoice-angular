import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'invoice-item-detail',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {

  itemForm: FormGroup = this.formBuilder.group({
    name: [{value: null, disabled: true}, [Validators.required]],
    unit: [null, [Validators.required]],
    price: [null, [Validators.required]],
    tax: [null, [Validators.required]]
  })

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    let item = await this.itemService.get(parseInt(id, 10));
    if (item) {
      this.itemForm.patchValue(item);
    }
  }

  async save() {
    if (this.itemForm.valid) {
      await this.itemService.add(this.itemForm.value);
      this.location.back();
    }
  }
}
