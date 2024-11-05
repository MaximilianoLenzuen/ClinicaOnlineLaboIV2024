import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformarIDaString',
  standalone: true
})
export class TransformarIDaStringPipe implements PipeTransform {

  transform(id: string, usuarios: any[]): string {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      return `${usuario.nombre} ${usuario.apellido}`;
    }
    return ''; 
  }

}
