import { Component } from '@angular/core';
import { Categorie } from '../model/categorie';
import { Produit } from '../model/produit';
import { FormControl, FormGroup } from '@angular/forms';
import { CategorieService } from 'src/app/service/categorie.service';
import { ProduitService } from 'src/app/service/produit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sup-produit',
  templateUrl: './sup-produit.component.html',
  styleUrls: ['./sup-produit.component.css'],
})
export class SupProduitComponent {
  categorie!: Categorie[];
  produit!: Produit;

  constructor(
    private categorieService: CategorieService,
    private produitService: ProduitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.categorieService.getAllCategorie().subscribe((data) => {
      this.categorie = data;
    });
    // Obtenez le paramètre 'id' depuis la route
    const IdFromRoute = Number(this.route.snapshot.paramMap.get('id'));

    // Utilisez l'ID récupéré pour obtenir l'objet Aliment correspondant
    this.produitService.getProduitById(IdFromRoute).subscribe((data) => {
      this.produit = data;
    });
  }

  onSup() {
    // console.log(this.produit);
    this.produitService.deleteProduit(this.produit).subscribe({
      next: (response) => {
        this.router.navigate(['/Accueil']);
      },
      error: (error) => {
        error;
      },
    });
  }
}
