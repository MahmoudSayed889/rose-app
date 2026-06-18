import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {

  type = input<'button' | 'submit' | 'reset'>('button')
  text = input<string>('')
  styleClass = input<string>('')
  disabled = input<boolean>(false)
  loading = input<boolean>(false)

  onClick = output<void>()

  handleClick() {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit();
    }
  }
}
