

import { Component, Injectable } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoadingComponent } from './loading/loading.component';
import { FirestoreService } from './services/firestore.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoadingComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class AppComponent {
  title = 'Vercha';
  menuOpen:boolean = false; // Estado del menú
  isLoggedIn = false;
  isLoading: boolean = false; // Inicialmente oculto
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  
  constructor(private router: Router,private firestoreService: FirestoreService){

  }


  ngOnInit() {
 
  }

  metodoApp() {

  }

  toggleMenu() {
    // this.menuOpen = !this.menuOpen;

    this.router.navigate(['/iniciarSesion']); 
  }
  
  inicio(){
    this.router.navigate(['/inicio']); 
  }

  iniciar(){
    this.isLoading =true;
    var email = this.loginForm.value.email ?? '';
    var contrasena = this.loginForm.value.password ?? '';
    
    this.firestoreService.addUser(email, contrasena)
    .then(() => {
      this.isLoading =false;
      
    if (email === '' || contrasena === '') {
      Swal.fire({
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'bottom-end',
      });
      return;
    }

    Swal.fire({
      title: 'Usuario o contraseña incorrectos',
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'bottom-end',
      background: '#f6f6f6',
    });   
    return;

    })
    .catch(error => {
      this.isLoading =false;

      
    if (email === '' || contrasena === '') {
      Swal.fire({
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'bottom-end',
      });
      return;
    }

    Swal.fire({
      title: 'Usuario o contraseña incorrectos',
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'bottom-end',
      background: '#f6f6f6',
    });   
    return;
    });

  }

  google(){
    this.isLoading =true;

    setTimeout(() => {
      this.isLoading =false;

    Swal.fire({
      title: 'Problemas de conexión',
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'bottom-end',
      background: '#f6f6f6',
    });   
  }, 3000);
  }
  
}




