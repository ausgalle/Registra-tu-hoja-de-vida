// import { provideRouter, withViewTransitions } from '@angular/router';
// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

// import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// import { routes } from './app.routes';
// import { environment } from './environments/environment';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyCiCCYSmp6-E-FPwAHSPoOZuwc6UbzQ3ig",
//   authDomain: "vercha-fe916.firebaseapp.com",
//   projectId: "vercha-fe916",
//   storageBucket: "vercha-fe916.firebasestorage.app",
//   messagingSenderId: "957728961286",
//   appId: "1:957728961286:web:ae25081519f88060a1a487",
//   measurementId: "G-41TRPWN557"
// };

// initializeApp(firebaseConfig);

// export const appConfig: ApplicationConfig = {
//   providers: [
//     // Inicializamos Firebase solo una vez
//     // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
//     // Agregamos los demás servicios de Firebase
//     // provideAuth(() => getAuth()),
//     // provideFirestore(() => getFirestore()),
//     // provideFunctions(() => getFunctions()),
//     // provideStorage(() => getStorage()),
//     // provideMessaging(() => getMessaging()),

//     // Configuramos las rutas
//     provideRouter(routes, withViewTransitions()),
//     importProvidersFrom(
//       HttpClientModule,
//       AngularFireModule.initializeApp(firebaseConfig),
//       AngularFirestoreModule
//     )
//   ],
// };


import { provideRouter, withViewTransitions } from '@angular/router';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiCCYSmp6-E-FPwAHSPoOZuwc6UbzQ3ig",
  authDomain: "vercha-fe916.firebaseapp.com",
  projectId: "vercha-fe916",
  storageBucket: "vercha-fe916.firebasestorage.app",
  messagingSenderId: "957728961286",
  appId: "1:957728961286:web:ae25081519f88060a1a487",
  measurementId: "G-41TRPWN557"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    )
  ],
};