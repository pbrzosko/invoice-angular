import { Injectable } from "@angular/core";
import {Item} from "../db/item.model";
import {DatabaseService} from "../db/database.service";

const ITEMS_KEY:string = 'invoice_items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private db: DatabaseService) {
  }

  async add(item: Item) {
    await this.db.items.add(item);
  }

  async update(item: Item) {
    await this.db.items.update(item.id, item);
  }

  async list() {
    return this.db.items.toArray();
  }

  async get(id: number) {
    return this.db.items.get(id);
  }

  async delete(id: number) {
    await this.db.items.delete(id);
  }
}
