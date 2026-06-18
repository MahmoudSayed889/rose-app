import { Component, inject, input, output } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SpLineComponent } from "../../../../../shared/components/sp-line/sp-line.component";
import { InputComponent, ButtonComponent } from "reusable-components";
import { PASSWORD_REGEX } from 'auth-library'
import { TranslatePipe } from '@ngx-translate/core';

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

  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('newPassword')?.value
    const rePassword: string = control.get('confirmPassword')?.value
    return (password == rePassword) ? null : { passwordMatch: true }
  }

  resetPasswordForm = this._fb.group({
    newPassword: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.rePasswordValidation })

  get passwordError(): string {
    const control = this.resetPasswordForm.get('newPassword');
    if (control?.hasError('required') && control?.touched) {
      return 'Password is required';
    }
    if (control?.hasError('pattern') && control?.touched) {
      return 'Password must include uppercase, lowercase, number, and special character.';
    }
    return '';
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.passwordChanged.emit(this.resetPasswordForm);
    }
  }

}
