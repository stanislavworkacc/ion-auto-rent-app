import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'thousand',
  standalone: true
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'number') {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else if (typeof value === 'string') {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return value;
  }
}
