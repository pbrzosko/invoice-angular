import {Component, OnInit, ViewChild} from "@angular/core";
import {Item} from "../item.model";
import {ItemService} from "../item.service";
import {ContextMenuComponent} from "../../dock/context-menu/context-menu.component";

@Component({
  selector: 'invoice-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  @ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;
  items: Item[] = [];

  constructor(private itemService: ItemService) {
  }

  async ngOnInit() {
    this.items = await this.itemService.list();
  }

  async delete(item: Item) {
    await this.itemService.delete(item.id);
    await this.ngOnInit();
  }
}
