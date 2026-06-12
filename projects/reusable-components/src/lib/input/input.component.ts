import { Component, forwardRef, Input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, icons } from 'lucide-angular';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'lib-input',
  imports: [InputTextModule, FormsModule, LucideAngularModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() labelForAndInputId!: string;
  @Input() errorMessage?: string;
  @Input() styleClass: string = '';
  @Input() inputType!: string;

  @Input() set disabled(value: boolean) {
    this.isDisabled.set(value);
  }

  value = signal('');
  isDisabled = signal(false);

  icons = icons;
  isShow: boolean = false

  show() {
    this.isShow = !this.isShow
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string | null): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue);
    this.onChange(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
