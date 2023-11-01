import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/component/model/produit';

import { ProduitService } from 'src/app/service/produit.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent {
  log: boolean = false;
  produits!: Produit[];
  constructor(private produitService: ProduitService, private router: Router) {}
  ngOnInit(): void {
    this.produitService.getAllProduit().subscribe((mesProduits) => {
      this.produits = mesProduits;
    });
    if (localStorage.getItem('token')) {
      this.log = true;
    }
  }
}
