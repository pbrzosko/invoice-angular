import { Injectable } from "@angular/core";
import {Item} from "./item.model";

const ITEMS_KEY:string = 'invoice_items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  async add(item: Item) {
    const items:Item[] = await this.list();
    item.id = items.length + 1;
    items.push(item);
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    return Promise.resolve();
  }

  async list() {
    const saved = localStorage.getItem(ITEMS_KEY);
    const items:Item[] = saved ? JSON.parse(saved) : [];
    return Promise.resolve(items);
  }

  async get(id: number) {
    const items:Item[] = await this.list();
    return items.find(item => item.id === id);
  }

  async delete(id: number) {
    let items:Item[] = await this.list();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    return Promise.resolve();
  }
}
