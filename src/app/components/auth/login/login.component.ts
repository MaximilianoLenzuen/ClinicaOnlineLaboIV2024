import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../../services/firestore.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;
  errMsgEmail!:string;
  errorStates = { email: false, pass: false };
  errMsg!:string;
  accesoRapido!:boolean;
  ngEmail!:string;
  ngPass!:string;
  errMsgPass!:string;
  @Input() redirect:boolean = true;
  @Output() register = new EventEmitter<any>();

  userImg:any = []

  isLoading:boolean = false;

  toggleAccesoRapido():void{
    this.accesoRapido = !this.accesoRapido;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private router:Router) {
    this.firestoreService.getDocuments("users").subscribe(data => {
      data.forEach(user => {
        switch(user.email) {
          case "especialistaUno@especialista.com": //especialista
          case "maxilenzuen@gmail.com": //paciente
          case "pacienteUno@paciente.com": //paciente
          case "pacienteDos@paciente.com": //paciente
          case "especialistaDos@especialista.com": //especialista
          case "admin@admin.com": //admin
            this.userImg.push({email: user.email, img: user.img});
            break;
        }
      });
    })
  }

  ngOnInit(): void {
    this.authService.logOut(this.redirect);
  }

  //?Login with firebase
  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);

  async onSubmit(formData: any){
    this.errorStates = { email: false, pass: false };
    this.errMsgEmail = "";
    this.errMsg = "";
    this.errMsgPass = "";
    
    if (formData) {
      this.isLoading = true;
      const esEspecialista = await this.verificarEspecialista(formData);
      this.authService.signIn(formData)
      .then((resp:any) => {
        if (!esEspecialista) {
          this.isLoading = false;
          this.errMsgEmail = "El correo necesita ser habilitado por un administrador."
          this.errorStates.email = true;
          return;
        }
        this.isLoading = false;
        this.logUserLogin(formData.email);
        this.router.navigateByUrl("/home");
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        switch(err.code){
          case "auth/invalid-email":
            this.errMsgEmail = "Ingrese un correo electronico valido."
            this.errorStates.email = true;
            break;
          case "auth/invalid-credential":
            this.errMsg = "Correo y/o contraseña incorrecta."
            this.errorStates.email = true;
            this.errorStates.pass = true;
            break;
          case "auth/missing-email":
            this.errMsgEmail = "Ingrese el correo electronico.";
            this.errorStates.email = true;
            this.errMsgPass = "Ingrese la contraseña";
            this.errorStates.pass = true;
            break;
        }
        if (!err.code) {
          this.errMsgEmail = "El correo electronico no esta verificado."
          this.errorStates.email = true;
        }
       
      });
    }
  }

  private logUserLogin(user:string) {
    const logEntry = {
      usuario: user,
      fechaDeIngreso: new Date().toISOString()
    };
    this.firestoreService.addDocument("logs", logEntry);
  }

  autoFill(user:string) : void {
    if (this.accesoRapido){
      switch (user) {
        case "user1":
          this.ngEmail = 'testeandolabo4-411@mailnesia.com';
          this.ngPass = '123456';
          break;
        case "user2":
          this.ngEmail = 'maximiliano.lenzuen@valtech.com';
          this.ngPass = '123456';
          break;
        case "user3":
          this.ngEmail = 'maximilianolenzuen@gmail.com';
          this.ngPass = '123456';
          break;
        case "user4":
          this.ngEmail = 'adneslo@mailnesia.com';
          this.ngPass = '123456';
          break; 
        case "user5":
          this.ngEmail = 'upna@mailnesia.com';
          this.ngPass = '123456';
          break;
        case "user6":
          this.ngEmail = 'esnasra@mailnesia.com';
          this.ngPass = '123456';
          break;
      }
    }
  }

  verificarEspecialista(user: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firestoreService.getDocumentsWhere("users", "email", user.email).subscribe((data: any) => {
        var esEspecialista = true;
        if (data[0].userType === "especialista") {
          esEspecialista = data[0].verificadoAdmin;
        }
        resolve(esEspecialista);
      }, error => {
        reject(error);
      });
    });
  }

  esperarYRedirigir(storage:string, detalle:any, url:string, intervalo:number = 50) {
    const idIntervalo = setInterval(() => {
        sessionStorage.setItem(storage, detalle);
        if (sessionStorage.getItem(storage) == detalle) {
            clearInterval(idIntervalo);
            this.router.navigateByUrl(url);
        }
    }, intervalo);
  }
}
