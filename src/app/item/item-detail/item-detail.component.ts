import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../item.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Subject} from "rxjs";
import {Item} from "../../db/item.model";

@Component({
  selector: 'invoice-item-detail',
  templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {

  item$ = new Subject<Item | undefined>();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemService: ItemService) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    const item = await this.itemService.get(parseInt(id, 10));
    this.item$.next(item);
    this.item$.complete();
  }

  async save(item: Item) {
    await this.itemService.update(item);
    this.location.back();
  }
}
