import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../component/model/categorie';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getAllCategorie(): Observable<Categorie[]> {
    const headers = this.setHeaders();
    // console.log('je suis ici');

    return this.http.get<Categorie[]>(`${this.baseApiUrl}/categorie`, {
      headers,
    });
  }
}
