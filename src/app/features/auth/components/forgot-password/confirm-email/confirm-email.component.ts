import { Location } from '@angular/common';
import { Component, inject, input, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  imports: [RouterLink],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  private readonly _location = inject(Location);

  userEmail = input<string>('');

  goBackToEmail(): void {
    this._location.back();
  }
}
