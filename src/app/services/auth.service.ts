import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private afAuth: AngularFireAuth,private afFunctions: AngularFireFunctions) {}

  // Inicio de sesión con correo y contraseña
  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Registro con correo y contraseña
  registerWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Inicio de sesión con Google
  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  resetPassword(email: string): Promise<void> {
    const resetPasswordFn = this.afFunctions.httpsCallable('customPasswordReset');
    return firstValueFrom(resetPasswordFn({ email })).then((result: any) => { // Usar firstValueFrom
       console.log('Resultado desde la funcion',result);
       return; // Agregado para que funcione con Promise<void>

   })
   .catch((error:any)=>{
      console.log('Error en la funcion',error);
       throw error;
   });
  }
  // Cerrar sesión
  logout() {
    return this.afAuth.signOut();
  }
}
