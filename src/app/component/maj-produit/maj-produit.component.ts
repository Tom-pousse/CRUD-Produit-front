import { Component } from '@angular/core';
import { Categorie } from '../model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { ProduitService } from 'src/app/service/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-maj-produit',
  templateUrl: './maj-produit.component.html',
  styleUrls: ['./maj-produit.component.css'],
})
export class MajProduitComponent {
  categorie!: Categorie[];
  produit!: Produit;
  hidden: boolean = true;
  hidden1: boolean = false;
  readonly: boolean = false;

  majProduit: FormGroup = new FormGroup({
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

  nomError: string = '';
  prixError: string = '';
  quantiteError: string = '';
  categorieError: string = '';

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

  onMaj() {
    // console.log('pouet');
    // console.log(this.majProduit.value);
    const monProduit = {
      nom: this.majProduit.value.nom,
      prix: this.majProduit.value.prix,
      quantite: this.majProduit.value.quantite,
      id_categorie: Number(this.majProduit.value.id_categorie),
    };

    console.log(monProduit);
    const test = this.test();
    if (test) {
      this.produitService
        .updateProduit(this.produit.id!, monProduit)
        .subscribe({
          next: (response) => {
            response;
            this.router.navigate(['Accueil']);
          },
          error: (error) => {
            error;
            console.log(error);

            // alert('quelque chose c est mal passé');
          },
        });
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
  test(): boolean {
    let erreur = true;

    if (this.majProduit.get('nom')!.hasError('required')) {
      this.nomError = 'Ta oublier un truc? le nom de ton produit ? .';
      erreur = false;
    }

    if (this.majProduit.get('nom')!.hasError('pattern')) {
      this.nomError = 'On veux un nom pas un truc chelou... .';
      erreur = false;
    }
    if (this.majProduit.get('prix')!.hasError('required')) {
      this.prixError = 'Ta oublier un truc? le prix de ton produit ? .';
      erreur = false;
    }

    if (this.majProduit.get('prix')!.hasError('pattern')) {
      this.prixError = "On veux un prix... sauf si tu l'offre?";
      erreur = false;
    }
    if (this.majProduit.get('quantite')!.hasError('required')) {
      this.quantiteError = 'Ta oublier un truc? la quantité de produit ? .';
      erreur = false;
    }

    if (this.majProduit.get('quantite')!.hasError('pattern')) {
      this.quantiteError = 'On veux une quantité pas un truc chelou... .';
      erreur = false;
    }
    if (this.majProduit.get('id_categorie')!.hasError('required')) {
      this.categorieError =
        "Ta oublier un truc? c'est un poisson ton produit ? .";
      erreur = false;
    }
    return erreur;
  }
}
