import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importez HttpHeaders
import { Utilisateur } from '../../../entities/utilisateur/utilisateur';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment.development';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class EditProfileComponent implements OnInit {
  id!: number;
  email: string = '';
  password: string = '';
  lastName: string = '';
  firstName: string = '';
  streetNumber: string = '';
  streetName: string = '';
  postalCode: string = '';
  city: string = '';
  telephone: string = '';
  username: string = '';
  birthday: string = '';
  successMessage: string = '';
  passwordError: boolean = false;

  imageUrl: string = environment.IMAGE_URL;
  user: Utilisateur | null = null; // Déplacez cette déclaration ici pour plus de clarté
  selectedFile: File | null = null; // Déplacez cette déclaration ici

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/utilisateurs/current-user')
      .subscribe({
        next: (user) => {
          this.user = user;
          this.id = user.id;
          this.email = user.email;
          this.lastName = user.nom;
          this.firstName = user.prenom;
          this.telephone = user.telephone;
          this.username = user.username;
          this.birthday = user.dateDeNaissance;

          // Assurez-vous que ces propriétés existent avant d'essayer de les assigner
          this.streetNumber = user.numeroRue !== undefined && user.numeroRue !== null ? user.numeroRue.toString() : '';
          this.streetName = user.nomRue || '';
          this.postalCode = user.codePostal || '';
          this.city = user.ville || '';

          // L'analyse de l'adresse peut être simplifiée si les champs sont déjà séparés
          // if (user.adresse) {
          //   const parts = user.adresse.split(',');
          //   const streetParts = parts[0]?.trim().split(' ');
          //   this.streetNumber = streetParts?.[0] || '';
          //   this.streetName = streetParts?.slice(1).join(' ') || '';
          //   this.postalCode = parts[1]?.trim().split(' ')[0] || '';
          //   this.city = parts[1]?.trim().split(' ').slice(1).join(' ') || '';
          // }
        },
        error: (error) => console.error('Erreur de chargement du profil', error)
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.successMessage = '';
    this.passwordError = false;

    if (this.password && this.password.length < 8) {
      this.passwordError = true;
      return;
    }

    // Créez l'objet DTO basé sur les champs du formulaire ou les valeurs existantes
    const utilisateurDto = {
      id: this.id,
      email: this.email || this.user?.email,
      nom: this.lastName || this.user?.nom,
      prenom: this.firstName || this.user?.prenom,
      // Convertir en nombre si nécessaire, et gérer les valeurs par défaut
      numeroRue: this.streetNumber ? parseInt(this.streetNumber) : (this.user?.numeroRue || null),
      nomRue: this.streetName || this.user?.nomRue || null,
      codePostal: this.postalCode || this.user?.codePostal || null,
      ville: this.city || this.user?.ville || null,
      // N'incluez pas photoProfil ici si le backend le gère via le MultipartFile
      // Le rôle ne devrait probablement pas être modifiable par le client.
      role: this.user?.role || null, // Assurez-vous que le backend le gère correctement si vous l'envoyez
      telephone: this.telephone || this.user?.telephone || null,
      username: this.username || this.user?.username || null,
      dateDeNaissance: this.birthday || this.user?.dateDeNaissance || null,
      // Le mot de passe est ajouté conditionnellement
      motDePasse: this.password || null
    };

    // Création de FormData pour envoyer le JSON et le fichier
    const formData = new FormData();
    formData.append('utilisateurDto', JSON.stringify(utilisateurDto)); // Clé 'utilisateurDto', valeur JSON stringifiée

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); // Clé 'file', valeur du fichier
    } else {
      // Si aucun nouveau fichier n'est sélectionné, et que l'utilisateur avait une photo,
      // vous pourriez vouloir envoyer une indication au backend de conserver la photo existante.
      // Par exemple, en envoyant le nom de la photo existante dans l'utilisateurDtoJSON,
      // ou en n'envoyant pas la partie 'file' du tout, ce qui est le comportement actuel.
      // Le backend gérera l'absence de 'file' (required = false)
    }

    // Envoi de la requête PUT avec FormData
    // Important : Ne pas définir 'Content-Type' manuellement pour HttpClient avec FormData.
    // Il gérera automatiquement le 'multipart/form-data' avec le 'boundary' correct.
    this.http.put(`http://localhost:8080/utilisateurs/${this.id}`, formData)
      .subscribe({
        next: () => {
          this.successMessage = 'Profil modifié avec succès ✅';
          setTimeout(() => this.router.navigate(['/profilepage']), 3000);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
          // Gérer l'affichage de l'erreur à l'utilisateur
        }
      });
  }

}
