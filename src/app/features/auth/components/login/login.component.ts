import { Component, inject, OnInit } from '@angular/core';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { Router, RouterLink } from "@angular/router";
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent, ButtonComponent } from 'reusable-components'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'auth-library';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-login',
  imports: [SpLineComponent, InputComponent, RouterLink, CheckboxModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends AppComponentBase implements OnInit {

  private _authService = inject(AuthService)
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
    })
  }

  login() {
    // console.log(this.form.value);
    this.formSubmited.set(true)

    const dataToSend = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this._authService.Login(dataToSend).subscribe({
      next: (res) => {
        // console.log(res);

        this.formSubmited.set(false)
        this._router.navigate(['/home'])
        localStorage.setItem('user', JSON.stringify(res))
        this.toaster('success', 'Login Successfully')
      }, error: (err) => {
        console.log(err);
        this.formSubmited.set(false)
        this.toaster('error', err.error.message)
      }
    })
  }
}
