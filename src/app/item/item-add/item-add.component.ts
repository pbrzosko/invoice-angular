import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ItemService} from "../item.service";
import {Location} from "@angular/common";
import {Item} from "../../db/item.model";

@Component({
  selector: 'invoice-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async add(item: Item) {
    await this.itemService.add(item);
    this.location.back();
  }
}
