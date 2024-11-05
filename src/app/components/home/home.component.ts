import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { Observable, Subscription, interval, take } from 'rxjs';
import { SeccionUsuariosComponent } from '../general/seccion-usuarios/seccion-usuarios.component';
import { DashboardComponent } from '../general/dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoadingComponent, 
            SeccionUsuariosComponent, 
            DashboardComponent
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);

  selectedNavItem: string = 'dashboard';
  userType!: string;
  isLoading: boolean = false;
  authSvc = inject(AuthService);
  storeSvc = inject(FirestoreService);
  user$!: Observable<any>;
  userReal: any = { nombre: '', apellido: '', img: '' };
  retryInterval: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    var retries = 0;
    this.user$ = this.authSvc.getUser();
    this.isLoading = true;
    this.retryInterval = interval(1000)
      .pipe(take(3))
      .subscribe(() => {
        this.user$.subscribe((user: any) => {
          if (user) {
            this.storeSvc.getDocument('users', user.uid).subscribe((doc) => {
              if (doc) {
                this.userType = doc.userType;
                this.userReal = doc;
                this.isLoading = false;
                if (this.retryInterval) {
                  this.retryInterval.unsubscribe();
                }
                this.storeSvc.getDocuments('turnos').subscribe((doc) => {
                  this.turnos = doc;
                  this.mostrarUltimosTurnos(user.uid);
                })
              }
            });
          } else {
            retries++;
            if (retries >= 3) {
              this.isLoading = false;
              this.router.navigate(['/bienvenido']);
              if (this.retryInterval) {
                this.retryInterval.unsubscribe();
              }
            }
          }
        });
      });
  }

  ngOnDestroy(): void {}

  selectNavItem(navItem: string): void {
    this.selectedNavItem = navItem;
  }

  
  cerrarSesion() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Está seguro que desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
      }
    });
  }


  turnos:any[] = [];
  utlimoTurno:any = { historialClinico: { altura: '', peso: '', presion: '' }};
  mostrarUltimosTurnos(usuarioID: string): void {
  
    // Filtrar los turnos del usuario
    let turnosUsuario = this.turnos.filter((turno:any) => turno.paciente === usuarioID && turno.estado === "Realizado");
  
    // Ordenar los turnos por fecha (asumiendo que la fecha está en formato ISO 8601)
    turnosUsuario.sort((a:any, b:any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  
    this.utlimoTurno = turnosUsuario[0];
  }
}
