import { Component, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'auth-library';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterLink],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  private readonly _authService = inject(AuthService);

  userEmail = input<string>('');
  state = output<string>();

  resendLoading = signal<boolean>(false);
  resendDisabled = signal<boolean>(false);
  resendCountdown = signal<number>(0);
  resendMessage = signal<string>('');

  startResendCountdown(): void {
    this.resendDisabled.set(true);
    this.resendCountdown.set(60);
    
  }

  goBackToEmail(): void {
    this.state.emit('email');
  }
}
