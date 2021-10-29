import { Injectable } from "@angular/core";
import {Invoice} from "./invoice.model";

const seller = {
  id: 1,
  name: 'NAND Przemyslaw Brzosko',
  accountNumber: '34 2343 2343 4541 4543 5453 5454 5444',
  street: 'Jana Krysta 5/8',
  zip: '01-106',
  city: 'Warszawa',
  tin: '527244453'
};

const buyer = {
  id: 2,
  name: 'Buyer',
  accountNumber: '34 7878 3466 8896 4378 4563 8976 4656',
  street: 'Marszalkowska 29',
  zip: '01-100',
  city: 'Warszawa',
  tin: '5275272222'
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: Invoice[] = [
    {
      month: 12,
      year: 2021,
      id: 1,
      issueDate: new Date(),
      invoiceDate: new Date(),
      seller: seller,
      buyer: buyer,
      items: []
    },
    {
      month: 12,
      year: 2021,
      id: 2,
      issueDate: new Date(),
      invoiceDate: new Date(),
      seller: seller,
      buyer: buyer,
      items: []
    },
    {
      month: 12,
      year: 2021,
      id: 3,
      issueDate: new Date(),
      invoiceDate: new Date(),
      seller: seller,
      buyer: buyer,
      items: []
    },
    {
      month: 2,
      year: 2021,
      id: 1,
      issueDate: new Date(),
      invoiceDate: new Date(),
      seller: seller,
      buyer: buyer,
      items: []
    },
    {
      month: 5,
      year: 2020,
      id: 1,
      issueDate: new Date(),
      invoiceDate: new Date(),
      seller: seller,
      buyer: buyer,
      items: []
    }
  ];


  find(year: number, month: number): Promise<Invoice[]> {
    return Promise.resolve(this.invoices.filter(invoice => invoice.year === year && invoice.month === month));
  }

  add(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  years() {
    return Promise.resolve([...this.invoices.reduce<Map<number, boolean>>((accumulator, current) => {
      accumulator.set(current.year, true);
      return accumulator;
    }, new Map()).keys()]);
  }

  months(year: number) {
    return Promise.resolve([...this.invoices.filter((item) => item.year === year).reduce<Map<number, boolean>>((accumulator, current) => {
      accumulator.set(current.month, true);
      return accumulator;
    }, new Map()).keys()]);
  }
}
