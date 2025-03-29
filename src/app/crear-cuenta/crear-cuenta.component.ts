import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { Firestore, collection, addDoc, doc, setDoc, getDoc } from "@angular/fire/firestore";
import { inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss'
})


export class CrearCuentaComponent {
  // private firestore: Firestore = inject(Firestore);
  // private usuariosCollection = collection(this.firestore, 'usuarios');

  email: string = '';
  password: string = '';

  isLoading: boolean = false;

  constructor(private router: Router,private loading: LoadingService,private authService: AuthService) {}
  
  // Método para redirigir al componente de registro
  redirectToLogin(): void {
      this.router.navigate(['/inicio']); // Ajusta la ruta según tu configuración
  }

  registerWithEmail() {
    this.authService
      .registerWithEmail(this.email, this.password)
      .then((res) => console.log('Registro exitoso:', res))
      .catch((err) => console.error('Error al registrar usuario:', err));
  }

  registerWithGoogle() {
    this.authService
      .loginWithGoogle() // Reutilizamos el método de inicio de sesión con Google
      .then((res) => console.log('Registro exitoso con Google:', res))
      .catch((err) => console.error('Error al registrar usuario con Google:', err));
  }
}
