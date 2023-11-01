import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ProduitComponent } from './page/produit/produit.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { AddProduitComponent } from './component/add-produit/add-produit.component';
import { MajProduitComponent } from './component/maj-produit/maj-produit.component';
import { SupProduitComponent } from './component/sup-produit/sup-produit.component';

const routes: Routes = [
  { path: '', component: ProduitComponent },
  { path: 'Accueil', component: ProduitComponent },
  { path: 'Add-produit', component: AddProduitComponent },
  { path: 'Maj-produit/:id', component: MajProduitComponent },
  { path: 'Sup-produit/:id', component: SupProduitComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
