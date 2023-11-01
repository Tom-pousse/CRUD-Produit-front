import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  connexion: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    mot_de_passe: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[A-Z])(?=.*[a-z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$'
      ),
    ]),
  });

  emailError: string = '';
  motDePasseError: string = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  onLogin() {
    this.emailError = '';
    this.motDePasseError = '';

    if (this.connexion.get('email')!.hasError('required')) {
      this.emailError = 'Youhou !! Il me faut un email ! ';
    }

    if (this.connexion.get('email')!.hasError('email')) {
      this.emailError = 'Ta vue la tronche de ton email ? allez stp... ';
    }

    if (this.connexion.get('mot_de_passe')!.hasError('required')) {
      this.motDePasseError = 'Pas de mot de passe... bas pas de compte ... ';
    }

    if (this.connexion.get('mot_de_passe')!.hasError('pattern')) {
      this.motDePasseError =
        "Hey!! un mdp c'est 8 caractères, 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et 1 caractère spécial.";
    }
    console.log(this.connexion.value);
    this.utilisateurService
      .connexionUtilisateur(this.connexion.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken);
          this.router.navigate(['Accueil']);
        },
        error: (error) => {
          error;
          console.log(error);

          alert('quelque chose c est mal passé');
        },
      });
  }

  enleverErreur(x: string) {
    if (x === 'email') {
      this.emailError = '';
    }

    if (x === 'mot_de_passe') {
      this.motDePasseError = '';
    }
  }
}
