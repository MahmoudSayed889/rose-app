import { Component, inject, OnInit } from '@angular/core';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { Router, RouterLink } from "@angular/router";
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

  private readonly _authService = inject(AuthService)
  private fb = inject(FormBuilder)
  private _router = inject(Router)

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
        this._router.navigate(['/home'])

        if (this.form.value.rememberMe) {
          this._cookieService.set('user', JSON.stringify(res.token), 90)
        } else {
          this._cookieService.set('user', JSON.stringify(res.token))
          console.log(res);
          
        }

        this._toastService.toaster('success', 'Login Successfully')

      }, error: () => {
        this.formSubmited.set(false)
      }
    })
  }
}
