import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipFormat'
})
export class ZipFormatPipe implements PipeTransform {

  transform(value: String | undefined): String | undefined {
    if (value && value.length === 5) {
      return value.substring(0, 2) + '-' + value.substring(2, value.length);
    } else {
      return value;
    }
  }
}
