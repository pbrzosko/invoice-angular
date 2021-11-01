import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyToWords'
})
export class CurrencyToWordsPipe implements PipeTransform {
  transform(value: number): string {
    return numToWords(String(value.toFixed(2)));
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

let numToWords = (n:string) => {
  let z = $localize `:@@0:zero`;
  let and = $localize `:@@and:and`;
  let a = [
    '',
    $localize `:@@1:one`,
    $localize `:@@2:two`,
    $localize `:@@3:three`,
    $localize `:@@4:four`,
    $localize `:@@5:five`,
    $localize `:@@6:six`,
    $localize `:@@7:seven`,
    $localize `:@@8:eight`,
    $localize `:@@9:nine`,
    $localize `:@@10:ten`,
    $localize `:@@11:eleven`,
    $localize `:@@12:twelve`,
    $localize `:@@13:thirteen`,
    $localize `:@@14:fourteen`,
    $localize `:@@15:fifteen`,
    $localize `:@@16:sixteen`,
    $localize `:@@17:seventeen`,
    $localize `:@@18:eighteen`,
    $localize `:@@19:nineteen`
  ];
  let b = [
    '',
    '',
    $localize `:@@20:twenty`,
    $localize `:@@30:thirty`,
    $localize `:@@40:forty`,
    $localize `:@@50:fifty`,
    $localize `:@@60:sixty`,
    $localize `:@@70:seventy`,
    $localize `:@@80:eighty`,
    $localize `:@@90:ninety`
  ];
  let h = [
    '',
    $localize `:@@100:one hundred`,
    $localize `:@@200:two hundred`,
    $localize `:@@300:three hundred`,
    $localize `:@@400:four hundred`,
    $localize `:@@500:five hundred`,
    $localize `:@@600:six hundred`,
    $localize `:@@700:seven hundred`,
    $localize `:@@800:eight hundred`,
    $localize `:@@900:nine hundred`
  ];
  let g = [
    [$localize `:@@cents.all:cents`, $localize `:@@cents.1:cent`, $localize `:@@cents.24:cents`],
    [$localize `:@@dollars.all:dollars`, $localize `:@@dollars.1:dollar`, $localize `:@@dollars.24:dollars`],
    [$localize `:@@thousands.all:thousands`, $localize `:@@thousands.1:thousand`, $localize `:@@thousands.24:thousands`],
    [$localize `:@@millions.all:millions`, $localize `:@@millions.1:million`, $localize `:@@millions.24:millions`],
    [$localize `:@@billions.all:billions`, $localize `:@@billions.1:billion`, $localize `:@@billions.24:billions`],
    [$localize `:@@trillions.all:trillions`, $localize `:@@trillions.1:trillion`, $localize `:@@trillions.24:trillions`]
  ];

  let groupName = (huns:number, tens:number, ones:number, i:number) => {
    if (huns === 0 && tens === 0 && ones === 1) {
      return g[i][1];
    } else if (ones === 2 || ones === 3 || ones === 4) {
      return g[i][2];
    } else {
      return g[i][0];
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
      i === 0 ? and + ' ': '',
      huns === 0 ? '' : h[huns] + ' ',
      ones === 0 ? b[tens] : b[tens] && b[tens] + ' ' || '',
      (ones + tens + huns) === 0 ? z + ' ' : (a[tens*10+ones] || a[ones]) + ' ',
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
