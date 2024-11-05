import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { FireStorageService } from './firestorage.service';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebase from 'firebase/compat/app';  // Asegúrate de importar desde firebase/compat/app

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(AngularFireAuth);
  router = inject(Router);
  firestore = inject(FirestoreService);
  firestorage = inject(FireStorageService);

  private userSubject: BehaviorSubject<firebase.User | null> = new BehaviorSubject<firebase.User | null>(null);
  public user$: Observable<firebase.User | null> = this.userSubject.asObservable();

  constructor() {
    this.auth.authState.subscribe(user => {
      this.userSubject.next(user);
    });
  }

  getAuth() {
    return getAuth();
  }

  signIn(user: any): Promise<boolean | Error> {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        if (userCredential.user && userCredential.user.emailVerified) {
          console.log('Inicio de sesión exitoso.');
          return true;
        } else {
          throw new Error('El correo electrónico no ha sido verificado.');
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  }

  async signUp(user: any, img: any, img2: any): Promise<boolean> {
    const userCredential = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
    const uid = userCredential.user?.uid;

    // Subir la primera imagen
    const imageUrl = await this.firestorage.uploadImage('usersProfiles', `${uid}.${img.type.split('/')[1]}`, img).toPromise();
    user.img = imageUrl;

    // Subir la segunda imagen si existe
    if (img2 && user.userType === 'paciente') {
      const imageUrl2 = await this.firestorage.uploadImage('usersProfiles', `${uid}_2.${img2.type.split('/')[1]}`, img2).toPromise();
      user.img2 = imageUrl2;
    }

    // Agregar el usuario a Firestore
    await this.firestore.addDocument('users', user, uid);

    // Enviar el correo de verificación
    await userCredential.user?.sendEmailVerification();

    return true;
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  logOut(redirect: boolean = true) {
    this.auth.signOut().then(() => {
      if (redirect) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  getUser(): Observable<firebase.User | null> {
    return this.user$;
  }
}
