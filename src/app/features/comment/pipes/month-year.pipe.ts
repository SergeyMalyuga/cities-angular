import {Pipe, PipeTransform} from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'monthYear',
})
export class MonthYearPipe implements PipeTransform {
  transform(value: string) {
    return dayjs(value).format('MMMM-YYYY');
  }
}
