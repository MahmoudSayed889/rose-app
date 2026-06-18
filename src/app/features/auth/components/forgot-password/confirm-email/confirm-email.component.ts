import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  userEmail = input<string>('');
  state = output<string>();

  goBackToEmail(): void {
    this.state.emit('email');
  }
}
