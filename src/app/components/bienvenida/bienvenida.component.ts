import { Component } from '@angular/core';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss',
})
export class BienvenidaComponent {
  register:boolean = false;
  togleForm(register: any) {
    this.register = register;
  }
}
