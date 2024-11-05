import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NurService {
  router = inject(Router);
  esperarYRedirigir(storage:string, detalle:any, url:string, intervalo:number = 50) {
    const idIntervalo = setInterval(() => {
        localStorage.setItem(storage, detalle);
        if (localStorage.getItem(storage) == detalle) {
            clearInterval(idIntervalo);
            this.router.navigateByUrl(url);
        }
    }, intervalo);
  }
}

