import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitilize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
  }
}
