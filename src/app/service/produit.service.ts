import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../component/model/produit';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseApiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getAllProduit(): Observable<Produit[]> {
    const headers = this.setHeaders();
    // console.log('je suis ici');

    return this.http.get<Produit[]>(`${this.baseApiUrl}/produit`, {
      headers,
    });
  }

  getProduitById(ProduitId: number): Observable<Produit> {
    // const headers = this.setHeaders();
    return this.http.get<Produit>(`${this.baseApiUrl}/produit/${ProduitId}`);
  }

  createProduit(produit: Produit): Observable<Produit> {
    const headers = this.setHeaders();
    console.log(produit);

    return this.http.post<Produit>(`${this.baseApiUrl}/produit/Add`, produit, {
      headers,
    });
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    const headers = this.setHeaders();
    console.log(produit);
    return this.http.patch<Produit>(
      `${this.baseApiUrl}/produit/${id}`,
      produit,
      { headers }
    );
  }

  deleteProduit(produit: Produit): Observable<Produit> {
    // recup le token dans le sessionstorage
    const headers = this.setHeaders();
    return this.http.delete<Produit>(
      `${this.baseApiUrl}/produit/${produit.id}`,
      {
        headers,
      }
    );
  }
}
