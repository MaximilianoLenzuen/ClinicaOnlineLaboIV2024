import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../../services/sweetAlert.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.scss'
})
export class CaptchaComponent {
  operand1!: number;
  operand2!: number;
  operator!: string;
  userAnswer: string = '';
  correctAnswer!: number;
  captchaVerified: boolean = false;

  @Output() verificacion = new EventEmitter<boolean>();

  constructor(private sweet: SweetAlertService) { }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    this.captchaVerified = false;
    this.operand1 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    this.operand2 = Math.floor(Math.random() * 10) + 1; // Número aleatorio entre 1 y 10
    const operators = ['+', '-', '*'];
    this.operator = operators[Math.floor(Math.random() * operators.length)]; // Operador aleatorio

    // Generar la respuesta correcta
    switch (this.operator) {
      case '+':
        this.correctAnswer = this.operand1 + this.operand2;
        break;
      case '-':
        this.correctAnswer = this.operand1 - this.operand2;
        break;
      case '*':
        this.correctAnswer = this.operand1 * this.operand2;
        break;
      default:
        this.correctAnswer = 0;
    }
  }

  verifyCaptcha(): void {
    const userResponse = parseInt(this.userAnswer, 10);
    if (userResponse === this.correctAnswer) {
      this.captchaVerified = true;
      this.verificacion.emit(true);
      this.sweet.showSuccessAlert("Captcha completado con éxito", "Éxito!", 'success');
    } else {
      this.sweet.showSuccessAlert("Vuelva a intentarlo", "Error", 'error');
      this.verificacion.emit(false);
      this.generateCaptcha(); // Generar un nuevo CAPTCHA
      this.userAnswer = ''; // Limpiar la respuesta del usuario
    }
  }
}
