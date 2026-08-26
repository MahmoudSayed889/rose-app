import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { InputComponent, ButtonComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';
import { ChangePasswordService } from '../../services/change-password.service';
import { passwordMatch } from '../../../../shared/validators/password-match.validator';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { VALIDATION_PATTERNS } from '../../../../shared/validators/patterns';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly _destoryRef = inject(DestroyRef);

  form!: FormGroup

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.password)]],
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

    this._changePasswordService.changePassword(dataToSend)
      .pipe(takeUntilDestroyed(this._destoryRef))
      .subscribe({
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
