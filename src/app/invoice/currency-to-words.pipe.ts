import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'currencyToWords'
})
export class CurrencyToWordsPipe implements PipeTransform {

  z = this.t.instant('numbers.0');
  and = this.t.instant('numbers.and');
  a = [
    '',
    this.t.instant('numbers.1'),
    this.t.instant('numbers.2'),
    this.t.instant('numbers.3'),
    this.t.instant('numbers.4'),
    this.t.instant('numbers.5'),
    this.t.instant('numbers.6'),
    this.t.instant('numbers.7'),
    this.t.instant('numbers.8'),
    this.t.instant('numbers.9'),
    this.t.instant('numbers.10'),
    this.t.instant('numbers.11'),
    this.t.instant('numbers.12'),
    this.t.instant('numbers.13'),
    this.t.instant('numbers.14'),
    this.t.instant('numbers.15'),
    this.t.instant('numbers.16'),
    this.t.instant('numbers.17'),
    this.t.instant('numbers.18'),
    this.t.instant('numbers.19')
  ];
  b = [
    '',
    '',
    this.t.instant('numbers.20'),
    this.t.instant('numbers.30'),
    this.t.instant('numbers.40'),
    this.t.instant('numbers.50'),
    this.t.instant('numbers.60'),
    this.t.instant('numbers.70'),
    this.t.instant('numbers.80'),
    this.t.instant('numbers.90')
  ];
  h = [
    '',
    this.t.instant('numbers.100'),
    this.t.instant('numbers.200'),
    this.t.instant('numbers.300'),
    this.t.instant('numbers.400'),
    this.t.instant('numbers.500'),
    this.t.instant('numbers.600'),
    this.t.instant('numbers.700'),
    this.t.instant('numbers.800'),
    this.t.instant('numbers.900')
  ];
  g = [
    [this.t.instant('numbers.cents.all'), this.t.instant('numbers.cents.1'), this.t.instant('numbers.cents.24')],
    [this.t.instant('numbers.dollars.all'), this.t.instant('numbers.dollars.1'), this.t.instant('numbers.dollars.24')],
    [this.t.instant('numbers.thousands.all'), this.t.instant('numbers.thousands.1'), this.t.instant('numbers.thousands.24')],
    [this.t.instant('numbers.millions.all'), this.t.instant('numbers.millions.1'), this.t.instant('numbers.millions.24')],
    [this.t.instant('numbers.billions.all'), this.t.instant('numbers.billions.1'), this.t.instant('numbers.billions.24')],
    [this.t.instant('numbers.trillions.all'), this.t.instant('numbers.trillions.1'), this.t.instant('numbers.trillions.24')],
    [this.t.instant('numbers.quadrillions.all'), this.t.instant('numbers.quadrillions.1'), this.t.instant('numbers.quadrillions.24')],
    [this.t.instant('numbers.quintillions.all'), this.t.instant('numbers.quintillions.1'), this.t.instant('numbers.quintillions.24')],
    [this.t.instant('numbers.sextillions.all'), this.t.instant('numbers.sextillions.1'), this.t.instant('numbers.sextillions.24')],
    [this.t.instant('numbers.septillions.all'), this.t.instant('numbers.septillions.1'), this.t.instant('numbers.septillions.24')],
    [this.t.instant('numbers.octillions.all'), this.t.instant('numbers.octillions.1'), this.t.instant('numbers.octillions.24')],
    [this.t.instant('numbers.nonillions.all'), this.t.instant('numbers.nonillions.1'), this.t.instant('numbers.nonillions.24')],
    [this.t.instant('numbers.decillions.all'), this.t.instant('numbers.decillions.1'), this.t.instant('numbers.decillions.24')]
  ];

  constructor(private t: TranslateService) {
  }

  transform(value: number): string {
    return numToWords(String(value.toFixed(2)), this.z, this.and, this.a, this.b, this.h, this.g);
  }
}

//@ts-ignore
const arr = x => Array.from(x);
//@ts-ignore
const num = x => Number(x) || 0;
//@ts-ignore
const isEmpty = xs => xs.length === 0;
//@ts-ignore
const take = n => xs => xs.slice(0,n);
//@ts-ignore
const drop = n => xs => xs.slice(n);
//@ts-ignore
const reverse = xs => xs.slice(0).reverse();
//@ts-ignore
const comp = f => g => x => f (g (x));
//@ts-ignore
const not = x => !x;
//@ts-ignore
const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

let numToWords = (n:string, z: string, and: string, a: string[], b: string[], h: string[], g: string[][]) => {

  let groupName = (huns:number, tens:number, ones:number, i:number) => {
    if (huns === 0 && tens === 0 && ones === 1) {
      return g[i][1];
    } else if (ones === 2 || ones === 3 || ones === 4) {
      return g[i][2];
    } else if (huns + tens + ones !== 0 || i <= 1) {
      return g[i][0];
    } else {
      return '';
    }
  }
  let numbers = (items: string[]) => {
    return [
      num(items[0]),
      num(items[1]),
      num(items[2])
    ];
  }
  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  let makeGroup = ([ones,tens,huns]: number[], i:number) => {
    const group = [
      i === 0 ? and + ' ': '', // and
      huns === 0 ? '' : h[huns] + ' ', // hundreds
      ones === 0 ? b[tens] : b[tens] && b[tens] + ' ' || '', // tens
      (ones + tens + huns) === 0 || ((ones + tens + huns) === 1 && i > 1) ? '' : (a[tens*10+ones] || a[ones]) + ' ', // ones
      groupName(huns, tens, ones, i)
    ];
    return group.join('');
  };
  return comp (chunk(3)) (reverse) (arr(n))
    .map(numbers)
    .map(makeGroup)
    .filter(comp(not)(isEmpty))
    .reverse()
    .join(' ');
};
