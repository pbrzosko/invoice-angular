import {Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Item} from "../../db/item.model";

@Component({
  selector: 'invoice-item-detail',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {

  item: Item | undefined;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.item = await this.itemService.get(parseInt(id, 10));
  }

  async save(item: Item) {
    await this.itemService.update(item);
    this.location.back();
  }
}
