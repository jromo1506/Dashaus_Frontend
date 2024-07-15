import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {
  //private apiUrl: string = 'https://webhook.lightbox.mx/dasHaus';
  private apiUrl: string = 'http://localhost:4000/dasHaus';
  constructor() { }

  getApiURL(){
    return this.apiUrl;
  }

  
}
