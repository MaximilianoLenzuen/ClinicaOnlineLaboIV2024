import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'graficoToString',
  standalone: true
})
export class GraficoToStringPipe implements PipeTransform {

  transform(value: any): unknown {
    return `${value.name} | ${value.value}\n`;
  }

}
