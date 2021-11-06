import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../item.service";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Item} from "../../db/item.model";

@Component({
  selector: 'invoice-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

  item$ = new Subject<Item | undefined>();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async ngOnInit() {
    await Promise.resolve();
    this.item$.next(undefined);
    this.item$.complete();
  }

  async add(item: Item) {
    await this.itemService.add(item);
    this.location.back();
  }
}
