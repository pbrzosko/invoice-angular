import Dexie from 'dexie';
import {Company} from "./company.model";
import {Item} from "./item.model";
import {Invoice} from "./invoice.model";

export class DatabaseService extends Dexie {

  companies!: Dexie.Table<Company, number>;
  items!: Dexie.Table<Item, number>;
  invoices!: Dexie.Table<Invoice, [number, number, number]>;

  constructor() {
    super("InvoicesDatabase");

    this.version(1).stores({
      companies: '++id',
      items: '++id',
      invoices: '[year+month+id],year,month'
    });
  }

}

export const db = new DatabaseService();
