import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaEspanol',
  standalone: true
})
export class DateEspañolPipe implements PipeTransform {
  transform(value: Date): string {
    const mesesDelAno = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    const dia = value.getDate().toString().padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const mes = mesesDelAno[value.getMonth()];

    return `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)}`; // Capitaliza el primer carácter del mes
  }
}
