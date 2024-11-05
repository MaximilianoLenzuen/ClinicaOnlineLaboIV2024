import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaHorarioPipe',
  standalone: true
})
export class DiaHorarioPipePipe implements PipeTransform {

  transform(fechaHora: string): string {
    if (!fechaHora) return '';

    const fecha = new Date(fechaHora);
    const dia = fecha.getDate();
    const mes = this.obtenerNombreMes(fecha.getMonth());
    const year = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();

    return `${this.obtenerNombreDia(fecha.getDay())}, ${dia} de ${mes} de ${year} - ${horas}:${minutos}`;
  }

  obtenerNombreDia(dia: number): string {
    switch (dia) {
      case 0: return 'Domingo';
      case 1: return 'Lunes';
      case 2: return 'Martes';
      case 3: return 'Miércoles';
      case 4: return 'Jueves';
      case 5: return 'Viernes';
      case 6: return 'Sábado';
      default: return '';
    }
  }

  obtenerNombreMes(mes: number): string {
    switch (mes) {
      case 0: return 'enero';
      case 1: return 'febrero';
      case 2: return 'marzo';
      case 3: return 'abril';
      case 4: return 'mayo';
      case 5: return 'junio';
      case 6: return 'julio';
      case 7: return 'agosto';
      case 8: return 'septiembre';
      case 9: return 'octubre';
      case 10: return 'noviembre';
      case 11: return 'diciembre';
      default: return '';
    }
  }


}
