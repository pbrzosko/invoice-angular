import {Injectable} from "@angular/core";
import {InvoiceItem, TotalItem} from "../db/invoice.model";
import {TranslateService} from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculateService {

  constructor(private t: TranslateService) {
  }


  calculateTotals(items: InvoiceItem[]) {
    const totals: TotalItem[] = [];
    const taxes = items.reduce<Map<number, number>>((accumulator, current) => {
      if (current.item && current.qty) {
        const currentTax = accumulator.get(current.item.tax);
        const price = current.item.price * current.qty;
        if (currentTax) {
          accumulator.set(current.item.tax, currentTax + price);
        } else {
          accumulator.set(current.item.tax, price);
        }
      }
      return accumulator;
    }, new Map());
    const total = {
      net: 0,
      tax: 0,
      gross: 0
    };
    taxes.forEach((value, key) => {
      const label = totals.length === 0 ? this.t.instant('invoice.totalWithin') : '';
      const tax = (value * key / 100);
      total.net += value;
      total.tax += tax;
      total.gross += value + tax;
      totals.push({
        label: label,
        net: value,
        rate: key + '%',
        tax: tax,
        gross: value + tax
      });
    });
    totals.unshift({
      label: this.t.instant('invoice.totalTotal'),
      net: total.net,
      rate: 'X',
      tax: total.tax,
      gross: total.gross
    });
    return totals;
  }
}
