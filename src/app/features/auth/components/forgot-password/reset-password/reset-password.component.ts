import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SpLineComponent } from "../../../../../shared/components/sp-line/sp-line.component";
import { InputComponent, ButtonComponent } from "reusable-components";

@Component({
  selector: 'app-reset-password',
  imports: [PasswordModule, FormsModule, SpLineComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly _fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  @Output() passwordChanged = new EventEmitter<FormGroup>();

  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('newPassword')?.value
    const rePassword: string = control.get('confirmPassword')?.value
    return (password == rePassword) ? null : { passwordMatch: true }
  }

  resetPasswordForm = this._fb.group({
    // token: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  }, { validators: this.rePasswordValidation })


  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.passwordChanged.emit(this.resetPasswordForm);
    }
    else {
      console.log('no no no');
    }
  }

}
