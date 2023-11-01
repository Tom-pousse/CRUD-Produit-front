import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/service/categorie.service';
import { Categorie } from '../model/categorie';
import { ProduitService } from 'src/app/service/produit.service';
import { Router } from '@angular/router';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css'],
})
export class AddProduitComponent {
  monProduit!: Produit;
  hidden: boolean = true;
  hidden1: boolean = false;
  readonly: boolean = false;

  addProduit: FormGroup = new FormGroup({
    nom: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*[a-zA-Z])[a-zA-Z0-9'àéè^¨ ]+$"),
    ]),
    prix: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(.[0-9]+)?$'),
    ]),
    quantite: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    id_categorie: new FormControl('', [Validators.required]),
  });
  categorie!: Categorie[];

  nomError: string = '';
  prixError: string = '';
  quantiteError: string = '';
  categorieError: string = '';

  constructor(
    private categorieService: CategorieService,
    private produitService: ProduitService,
    private router: Router
  ) {}
  ngOnInit() {
    this.categorieService.getAllCategorie().subscribe((data) => {
      this.categorie = data;
      // console.log(this.categorie);
    });
  }
  onAdd() {
    // console.log(this.AddProduit.value);
    const monProduit = {
      nom: this.addProduit.value.nom,
      prix: this.addProduit.value.prix,
      quantite: this.addProduit.value.quantite,
      id_categorie: Number(this.addProduit.value.id_categorie),
    };

    const test = this.test();
    if (test) {
      // console.log(monProduit);

      this.produitService.createProduit(monProduit).subscribe({
        next: (response) => {
          response;

          this.router.navigate(['Accueil']);
        },
        error: (error) => {
          error;
          console.log(error);
        },
      });
    }
  }
  enleverErreur(x: string) {
    if (x === 'nom') {
      this.nomError = '';
    }
    if (x === 'prix') {
      this.prixError = '';
    }
    if (x === 'quantite') {
      this.quantiteError = '';
    }
    if (x === 'id_categorie') {
      this.categorieError = '';
    }
  }

  changediv() {
    const test = this.test();
    if (test) {
      if (
        this.hidden === this.hidden &&
        this.hidden1 === this.hidden1 &&
        this.readonly === this.readonly
      ) {
        this.hidden = !this.hidden;
        this.hidden1 = !this.hidden1;
        this.readonly = !this.readonly;
      }
    }
  }
  test(): boolean {
    let erreur = true;

    if (this.addProduit.get('nom')!.hasError('required')) {
      this.nomError = 'Ta oublié un truc? le nom de ton produit ? .';
      erreur = false;
    }

    if (this.addProduit.get('nom')!.hasError('pattern')) {
      this.nomError = 'On veut un nom pas un truc chelou... .';
      erreur = false;
    }
    if (this.addProduit.get('prix')!.hasError('required')) {
      this.prixError = 'Ta oublié un truc? le prix de ton produit ? .';
      erreur = false;
    }

    if (this.addProduit.get('prix')!.hasError('pattern')) {
      this.prixError = "On veut un prix... sauf si tu l'offre?";
      erreur = false;
    }
    if (this.addProduit.get('quantite')!.hasError('required')) {
      this.quantiteError = 'Ta oublié un truc? la quantité de produit ?';
      erreur = false;
    }

    if (this.addProduit.get('quantite')!.hasError('pattern')) {
      this.quantiteError = 'On veut une quantité pas un truc chelou...';
      erreur = false;
    }
    if (this.addProduit.get('id_categorie')!.hasError('required')) {
      this.categorieError = "Ta oublié un truc? c'est un poisson? .";
      erreur = false;
    }
    return erreur;
  }
}
