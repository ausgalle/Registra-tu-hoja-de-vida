import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { HomeComponent } from './home/home.component';
import { OlvideContrasenaComponent } from './olvide-contrasena/olvide-contrasena.component';


export const routes: Routes = [

    { 
        path: '', 
        redirectTo: '/inicio', 
        pathMatch: 'full' 
    },
    { 
        path: 'inicio',
        component: HomeComponent
    },
    { 
        path: 'iniciarSesion',
        component: IniciarSesionComponent
    },
    { 
        path: 'registrate',
        component: CrearCuentaComponent
    },
    { 
        path: 'olvidoContrasena',
        component: OlvideContrasenaComponent
    }


];
