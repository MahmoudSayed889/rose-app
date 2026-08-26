import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputComponent, ButtonComponent } from 'reusable-components';
import { SpLineComponent } from '../../../../shared/components/sp-line/sp-line.component';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { VALIDATION_PATTERNS } from '../../../../shared/validators/patterns';

type RegisterStep = 1 | 2 | 3;

@Component({
  selector: 'app-register',
  imports: [
    SpLineComponent,
    InputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    TranslatePipe,
    InputTextModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent extends AppComponentBase implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  currentStep = signal<RegisterStep>(1);
  verifiedEmail = signal('');

  emailForm!: FormGroup;
  otpForm!: FormGroup;
  registerForm!: FormGroup;

  otpDigits = signal<string[]>(['', '', '', '', '', '']);

  inPoppup = input<boolean>(false)

  genderOptions = [
    { label: 'auth.male', value: 'MALE' },
    { label: 'auth.female', value: 'FEMALE' },
  ];

  ngOnInit(): void {
    this.createForms();
  }

  createForms(): void {
    this.emailForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this._fb.group({
      code: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.code)]],
    });

    this.registerForm = this._fb.group(
      {
        email: [{ value: '', disabled: true }, Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.password)]],
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  submitEmail(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.formSubmited.set(true);
    const email = this.emailForm.value.email as string;

    this._authService.sendEmailVerification(email).subscribe({
      next: () => {
        this.formSubmited.set(false);
        this.verifiedEmail.set(email);
        this.currentStep.set(2);
        this.resetOtpDigits();
      },
      error: (err) => {
        this.formSubmited.set(false);
        this._toastService.toaster('error', err.error?.message ?? err.message);
      },
    });
  }

  submitOtp(): void {
    this.syncOtpControl();

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.formSubmited.set(true);
    const code = this.otpForm.value.code as string;

    this._authService.confirmEmailVerification(this.verifiedEmail(), code).subscribe({
      next: () => {
        this.formSubmited.set(false);
        this.registerForm.patchValue({ email: this.verifiedEmail() });
        this.currentStep.set(3);
      },
      error: (err) => {
        this.formSubmited.set(false);
        this._toastService.toaster('error', err.error?.message ?? err.message);
      },
    });
  }

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.formSubmited.set(true);

    const payload = {
      email: this.verifiedEmail(),
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      gender: this.registerForm.get('gender')?.value,
    };

    this._authService.register(payload).subscribe({
      next: (res) => {
        this.formSubmited.set(false);
        localStorage.setItem('user', JSON.stringify(res));
        this._toastService.toaster('success', 'Registration successful');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this.formSubmited.set(false);
        this._toastService.toaster('error', err.error?.message ?? err.message);
      },
    });
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);

    this.otpDigits.update((digits) => {
      const next = [...digits];
      next[index] = digit;
      return next;
    });

    input.value = digit;
    this.syncOtpControl();

    if (digit && index < 5) {
      const nextInput = input.parentElement?.querySelector<HTMLInputElement>(
        `[data-otp-index="${index + 1}"]`
      );
      nextInput?.focus();
    }
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = input.parentElement?.querySelector<HTMLInputElement>(
        `[data-otp-index="${index - 1}"]`
      );
      prevInput?.focus();
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const digits = pasted.replace(/\D/g, '').slice(0, 6).split('');

    this.otpDigits.update(() => {
      const next = ['', '', '', '', '', ''];
      digits.forEach((digit, index) => {
        next[index] = digit;
      });
      return next;
    });

    this.syncOtpControl();
  }

  private resetOtpDigits(): void {
    this.otpDigits.set(['', '', '', '', '', '']);
    this.otpForm.reset({ code: '' });
  }

  private syncOtpControl(): void {
    const code = this.otpDigits().join('');
    this.otpForm.patchValue({ code });
    this.otpForm.get('code')?.markAsTouched();
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control?.invalid && control.touched);
  }

  isConfirmPasswordInvalid(): boolean {
    const control = this.registerForm.get('confirmPassword');
    return !!(
      control?.touched &&
      (control.hasError('required') || this.registerForm.hasError('passwordMismatch'))
    );
  }
}
