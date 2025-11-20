import {Pipe, PipeTransform} from '@angular/core';
import dayjs from 'dayjs';

@Pipe(
  {
    name: 'fullDate'
  }
)

export class FullDatePipe implements PipeTransform {
    transform(value: string) {
      return dayjs(value).format('YYYY-MM-DD');
    }
}
