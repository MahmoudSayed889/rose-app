import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'reusable-components';

@Component({
  selector: 'app-input-test',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './input-test.component.html',
  styleUrl: './input-test.component.scss',
})
export class InputTestComponent {
  form = new FormGroup({
    username: new FormControl('', { validators: Validators.required }),
  });

  setValue(): void {
    this.form.patchValue({ username: 'test' });
  }

  toggleDisable(): void {
    const control = this.form.get('username');

    if (control?.disabled) {
      control.enable();
    } else {
      control?.disable();
    }
  }

  resetForm(): void {
    this.form.reset();
  }
}
