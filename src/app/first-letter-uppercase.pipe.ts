import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
  standalone: true
})
export class FirstLetterUppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let stringArray = value.split('');
    stringArray[0] = stringArray[0].toUpperCase();
    value = stringArray.join('');
    return value;
  }

}
