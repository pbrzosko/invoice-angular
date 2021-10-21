import { Injectable } from "@angular/core";
import {Invoice} from "./invoice.model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: Invoice[] = [
    {
      month: 12,
      year: 2021,
      id: 1
    },
    {
      month: 12,
      year: 2021,
      id: 2
    },
    {
      month: 12,
      year: 2021,
      id: 3
    },
    {
      month: 5,
      year: 2020,
      id: 1
    }
  ];


  findAll(): Promise<Invoice[]> {
    return Promise.resolve(this.invoices);
  }

  save(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  years() {
    return Promise.resolve([...this.invoices.reduce<Map<Number, Boolean>>((accumulator, current) => {
      accumulator.set(current.year, true);
      return accumulator;
    }, new Map()).keys()]);
  }

  months(year: number) {
    return Promise.resolve([...this.invoices.filter((item) => item.year === year).reduce<Map<Number, Boolean>>((accumulator, current) => {
      accumulator.set(current.month, true);
      return accumulator;
    }, new Map()).keys()]);
  }
}
