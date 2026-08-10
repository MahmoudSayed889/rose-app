import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { InputComponent, ButtonComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangePasswordService } from '../../services/change-password.service';
import { passwordMatch } from '../../../../shared/validators/password-match.validator';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    SpLineComponent,
    InputComponent,
    TranslatePipe,
    ButtonComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent extends AppComponentBase implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly _changePasswordService = inject(ChangePasswordService)

  form!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword: [''],
    }, { validators: passwordMatch })
  }

  save() {
    this.formSubmited.set(true)

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.formSubmited.set(false)
      return
    }

    const dataToSend = {
      currentPassword: this.form.get('currentPassword')?.value,
      newPassword: this.form.get('newPassword')?.value,
      confirmPassword: this.form.get('confirmPassword')?.value,
    }

    this._changePasswordService.changePassword(dataToSend).subscribe({
      next: (res) => {
        this._toastService.toaster('success', res.message)
        this.formSubmited.set(false)
        this.form.reset()
      }, error: () => {
        this.formSubmited.set(false)
      }
    })
  }

  
}
