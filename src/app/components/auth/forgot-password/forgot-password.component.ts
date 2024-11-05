import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  errMsgEmail!:string;
  errorStates = { email: false };
  res!:boolean;

  constructor() {}

  //?fp with firebase
  firebaseService = inject(AuthService);

  async onSubmit(frm:any){
    this.errMsgEmail = "";
    this.errorStates.email = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(frm.email)) {
      this.errMsgEmail = "Ingrese un email valido.";
      this.errorStates.email = true;
      return;
    }

    this.firebaseService.sendRecoveryEmail(frm.email)
    .then(() => {
      this.res = true;
    })
    .catch(err => {
      console.log(err);
    });
  };
}
