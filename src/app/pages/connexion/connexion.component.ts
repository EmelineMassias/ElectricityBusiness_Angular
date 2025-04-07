import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {

  form: FormGroup
  errorMsg?: string
  requestOnGoing: boolean = false

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit (): void {
    this.initForm()
  }

  async onSubmitLogin (): Promise<void> {
    if(this.form.invalid || this.requestOnGoing) return

    const { email, password, remember } = this.form.value
    this.errorMsg = undefined
    this.requestOnGoing = true

    try {
      await this.authService.login(email, password, remember)
      this.router.navigateByUrl('/profilepage')
    }
    catch (e: any) {
      if(e.status === 401) this.errorMsg = 'Email ou mot de passe incorrect.'
      else this.errorMsg = 'Une erreur est survenue. Veuillez réessayer plus tard.'
    }

    this.requestOnGoing = false
  }

  private initForm (): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      remember: new FormControl(false)
    })
  }
}
