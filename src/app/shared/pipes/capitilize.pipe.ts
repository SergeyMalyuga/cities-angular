import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitilize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
    }
    return '';
  }
}
