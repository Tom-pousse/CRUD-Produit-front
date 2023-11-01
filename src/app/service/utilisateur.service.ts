import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../component/model/utilisateur';
import { Connexion } from '../component/model/connexion';
import { ReponseConnexion } from '../component/model/reponseConnexion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  connexionUtilisateur(data: Connexion): Observable<ReponseConnexion> {
    return this.http.post<ReponseConnexion>(
      `${this.baseApiUrl}/auth/login`,
      data
    );
  }
}
