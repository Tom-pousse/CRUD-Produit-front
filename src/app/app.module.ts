import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './page/produit/produit.component';
import { ConnexionComponent } from './component/connexion/connexion.component';
import { SupProduitComponent } from './component/sup-produit/sup-produit.component';
import { AddProduitComponent } from './component/add-produit/add-produit.component';
import { MajProduitComponent } from './component/maj-produit/maj-produit.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    ConnexionComponent,
    SupProduitComponent,
    AddProduitComponent,
    MajProduitComponent,
    NotFoundComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
