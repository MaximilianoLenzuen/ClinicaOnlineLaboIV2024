import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-listado-especialidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-especialidades.component.html',
  styleUrl: './listado-especialidades.component.scss'
})
export class ListadoEspecialidadesComponent {
  @Input() especialidades: any[] = [];
  @Output() especialidadesActualizadas = new EventEmitter<any>();

  eliminarEspecialidad(index: number): void {
    if (index != -1) {
      if (index >= 0 && index < this.especialidades.length) {
        this.especialidades.splice(index, 1); // Eliminar la especialidad del array
        if(this.especialidades.length == 0){
          this.especialidadesActualizadas.emit(false);
        }
        this.especialidadesActualizadas.emit(this.especialidades); // Emitir el array actualizado
      }
    } else {
      this.especialidadesActualizadas.emit(this.especialidades); // Emitir el array actualizado
    }
  }
}
