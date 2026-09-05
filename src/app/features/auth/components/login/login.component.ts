import { Component, inject, input, OnInit } from '@angular/core';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent, ButtonComponent } from 'reusable-components'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'auth-library';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    SpLineComponent,
    InputComponent,
    RouterLink,
    CheckboxModule,
    ButtonComponent,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends AppComponentBase implements OnInit {

  private fb = inject(FormBuilder)
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)

  inPoppup = input<boolean>(false)

  form!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    })
  }

  login() {
    this.formSubmited.set(true)

    const dataToSend = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this._authService.Login(dataToSend).subscribe({
      next: (res) => {
        this.formSubmited.set(false)

        if (this.form.value.rememberMe) {
          this._cookieService.set('user', JSON.stringify(res.token), 90)
          this._authService.isAuthenticated.set(true);
        } else {
          this._cookieService.set('user', JSON.stringify(res.token))
          this._authService.isAuthenticated.set(true);
        }

        const callbackUrl = this._activatedRoute.snapshot.queryParamMap.get('callbackurl');
        
        if (callbackUrl && res.role.toLocaleLowerCase() == 'admin') {
          window.location.href = callbackUrl;
        } else {
          this._router.navigate([this._router.url.includes('login') ? '/home' : this._router.url])
          this._toastService.toaster('success', 'Login Successfully')
        }

      }, error: () => {
        this.formSubmited.set(false)
      }
    })
  }
}
