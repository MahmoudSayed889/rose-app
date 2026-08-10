import { Component, inject, input, output } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SpLineComponent } from "../../../../../shared/components/sp-line/sp-line.component";
import { InputComponent, ButtonComponent } from "reusable-components";
import { PASSWORD_REGEX } from 'auth-library'
import { TranslatePipe } from '@ngx-translate/core';
import { VALIDATION_PATTERNS } from '../../../../../shared/validators/patterns';

@Component({
  selector: 'app-reset-password',
  imports: [PasswordModule, FormsModule, SpLineComponent, InputComponent, ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly _fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  passwordChanged = output<FormGroup>();

  rePasswordValidation: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('newPassword')?.value;
  const confirmControl = group.get('confirmPassword');

  if (password && confirmControl?.value && password !== confirmControl.value) {
    confirmControl.setErrors({ ...confirmControl.errors, passwordMatch: true });
    return { passwordMatch: true };
  }

  if (confirmControl?.hasError('passwordMatch')) {
    const errors = { ...confirmControl.errors };
    delete errors['passwordMatch'];
    confirmControl.setErrors(Object.keys(errors).length ? errors : null);
  }

  return null;
}

  resetPasswordForm = this._fb.group({
    newPassword: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.password)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.rePasswordValidation })

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.passwordChanged.emit(this.resetPasswordForm);
    }
  }

}
