import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe, DecimalPipe} from "@angular/common";

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  currencies:any = {
    pl: 'PLN',
    en: 'USD'
  }

  constructor(private currencyPipe: CurrencyPipe,
              private decimalPipe: DecimalPipe) {
  }

  transform(value: any, ...args: any[]): any {
    const locale = (/^pl\b/.test(navigator.language)) ? 'pl' : 'en';
    const currency = this.currencies[locale];
    const currencyFormat = args[0] || false;
    if (currencyFormat) {
      return this.currencyPipe.transform(value, currency, 'symbol', '1.2-2', locale);
    } else {
      return this.decimalPipe.transform(value, '1.2-2', locale);
    }
  }
}
