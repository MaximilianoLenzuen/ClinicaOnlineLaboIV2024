import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seleccionar-especialidad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seleccionar-especialidad.component.html',
  styleUrl: './seleccionar-especialidad.component.scss'
})
export class SeleccionarEspecialidadComponent {
  @Input() especialidades: any;
  @Output() especialidadCreada = new EventEmitter<any>();

  errorStates = {
    especialidad: false,
    especialidadPersonalizada: false
  };

  especialidadSeleccionada: string = '';
  otraEspecialidad: boolean = false;
  especialidadPersonalizada: string = '';
  errMsg:string = "";

  @ViewChild('especialidadPersonalizadaInput') especialidadPersonalizadaInput!: ElementRef;

  constructor(){}

  onEspecialidadChange(event: any): void {
    this.especialidadSeleccionada = event.target.value;
    this.otraEspecialidad = this.especialidadSeleccionada === 'otra';
    if (this.otraEspecialidad) {
      setTimeout(() => {
        this.especialidadPersonalizadaInput.nativeElement.focus();
      }, 0);
    }
  }

  onSubmit(): void {
    this.errorStates = {
      especialidad: false,
      especialidadPersonalizada: false
    };

    if (!this.especialidadSeleccionada) {
      this.errorStates.especialidad = true;        
      this.errMsg = "Seleccione una especialidad";
      return;
    }

    if (this.otraEspecialidad && !this.especialidadPersonalizada) {
      this.errorStates.especialidadPersonalizada = true;
      this.errMsg = "Ingrese la especialidad";
      return;
    }

    if (!this.especialidades) {
        this.especialidades = [];
    }

    if (this.otraEspecialidad) {
      if (this.especialidades.includes(this.especialidadPersonalizada)) {
        this.errorStates.especialidad = true;
        return; 
      }
      this.especialidades.push({nombre: this.especialidadPersonalizada, horarios: []});
    } else {
      if (this.especialidades.includes(this.especialidadSeleccionada)) {
        this.errMsg = "Esta especialidad ya esta seleccionada";
        return; 
      }
      this.especialidades.push({nombre: this.especialidadSeleccionada, horarios: []});
    }
    
    this.especialidadCreada.emit(this.especialidades);
  }

}
