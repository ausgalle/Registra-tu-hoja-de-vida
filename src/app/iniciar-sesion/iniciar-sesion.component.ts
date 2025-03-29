import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.scss'
})

export class IniciarSesionComponent {
  email: string = '';
  password: string = '';

  showPassword: boolean = false;

  // Mapa de errores traducidos
  errorMessages: { [key: string]: string } = {
    'auth/invalid-email': 'El correo electrónico tiene un formato inválido.',
    'auth/user-not-found': 'No se encontró un usuario con este correo.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/invalid-credential': 'La contraseña es incorrecta.',
    'auth/email-already-in-use': 'El correo electrónico ya está en uso.',
    'auth/weak-password': 'La contraseña es demasiado débil.',
    'auth/network-request-failed': 'Error de red. Por favor, intenta de nuevo.',
  };

  constructor(private router: Router,private authService: AuthService,private loading: LoadingService) {}

  // Método para redirigir al componente de registro
  redirectToRegister(): void {
    this.router.navigate(['/registrate']); // Ajusta la ruta según tu configuración
  }

  loginWithEmail() {
    this.loading.show();
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      this.loading.hide();
      return;
    }

    this.authService
      .loginWithEmail(this.email, this.password)
      .then((res) => {
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Bienvenido!',
          showConfirmButton: false,
          timer: 2500,
          width: '400px',
          padding: '20px',
          customClass: {
            popup: 'rounded-lg',
          },
          toast: true,
          timerProgressBar: true,
        });
        this.loading.hide();
        this.router.navigate(['/inicio']); 
      })
      .catch((err) => {
        // Obtener el mensaje traducido
        const errorMessage =
          this.errorMessages[err.code] || 'Ocurrió un error desconocido.';
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: errorMessage,
        });
        this.loading.hide();
        console.error('Error al iniciar sesión:', err);
      });
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then((res) => {
        // Mostrar un mensaje de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido con Google!',
        });
        console.log('Inicio de sesión exitoso con Google:', res);
      })
      .catch((err) => {
        // Mapa de errores traducidos para Google (similar al caso de email)
        const errorMessages: { [key: string]: string } = {
          'auth/popup-closed-by-user': 'La ventana emergente fue cerrada antes de completar el inicio de sesión.',
          'auth/cancelled-popup-request': 'Se canceló la solicitud de inicio de sesión.',
          'auth/popup-blocked': 'El navegador bloqueó la ventana emergente. Habilítala para continuar.',
          'auth/network-request-failed': 'Error de red. Por favor, verifica tu conexión.',
          'auth/internal-error': 'Ocurrió un error interno. Intenta de nuevo más tarde.',
        };
  
        // Obtener mensaje traducido o mensaje genérico
        const errorMessage =
          errorMessages[err.code] || 'Ocurrió un error desconocido durante el inicio de sesión con Google.';
  
        // Mostrar el error al usuario
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión con Google',
          text: errorMessage,
        });
        console.error('Error al iniciar sesión con Google:', err);
      });
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  olvidoContrasena(){
    this.router.navigate(['/olvidoContrasena']); 
  }


}