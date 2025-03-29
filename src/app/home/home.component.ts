import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { CommonModule } from '@angular/common';

interface Ropa {
  genero: string;
  tipo: string;
  url: string;
  nombre:string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ropa$: Observable<Ropa[]> | undefined;

  ropaList: Ropa[] = [
    {
      genero: '',
      tipo: '',
      url: '',
      nombre:''
    }
  ]

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.ropa$ = this.firestoreService.getRopa();
    this.ropa$?.subscribe(ropaList => {
     this.ropaList=  ropaList;
    });
  }
}