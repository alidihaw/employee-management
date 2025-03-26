import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true,
})
export class RupiahPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return 'Rp' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}