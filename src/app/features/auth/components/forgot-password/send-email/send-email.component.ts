import { Component, inject, input, output } from '@angular/core';
import { SpLineComponent } from "../../../../../shared/components/sp-line/sp-line.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent, ButtonComponent } from "reusable-components";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-send-email',
  imports: [SpLineComponent, ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink, TranslatePipe],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent {
  private readonly _fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  emailSubmitted = output<string>();

  sendEmailForm: FormGroup = this._fb.group({
    email: [null, [Validators.email, Validators.required]]
  })

  get emailControl() {
    return this.sendEmailForm.get('email');
  }
  get emailError(): string {
    const control = this.emailControl;
    if (control?.hasError('required') && control?.touched) {
      return 'Email is required';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  onSubmit(): void {
    if (this.sendEmailForm.valid && this.emailControl?.value) {
      this.emailSubmitted.emit(this.emailControl.value);
    }
  }

}
