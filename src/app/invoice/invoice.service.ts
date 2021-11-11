import { Injectable } from "@angular/core";
import {Invoice} from "../db/invoice.model";
import {DatabaseService} from "../db/database.service";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private db: DatabaseService) {
  }

  async find(year: number, month: number) {
    return this.db.invoices.where({year: year, month: month}).toArray();
  }

  async nextId(year: number, month: number) {
    let max = 0;
    await this.db.invoices.where({year: year, month: month}).eachPrimaryKey(key => {
      if (key[2] >= max) {
        max = key[2];
      }
    });
    return max + 1;
  }

  async get(year: number, month: number, id: number) {
    return this.db.invoices.get([year, month, id]);
  }

  async add(invoice: Invoice) {
    await this.db.invoices.add(invoice);
  }

  async delete(year: number, month: number, id: number) {
    await this.db.invoices.delete([year, month, id]);
  }

  async years() {
    return await this.db.invoices.orderBy('year').uniqueKeys() as number[];
  }

  async months(year: number) {
    return await this.db.invoices.orderBy('month').filter(invoice => invoice.year === year).uniqueKeys() as number[];
  }
}
