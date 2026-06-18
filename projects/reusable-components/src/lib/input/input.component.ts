import {
  Component,
  forwardRef,
  inject,
  Injector,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, icons } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'lib-input',
  imports: [InputTextModule, FormsModule, LucideAngularModule, TranslatePipe],
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
export class InputComponent implements ControlValueAccessor, OnInit {

  private injector = inject(Injector);

  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputId!: string;
  @Input() styleClass = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() valid: boolean = false;

  @Input() set disabled(value: boolean) {
    this.isDisabled.set(value);
  }

  icons = icons;
  value = signal('');
  isDisabled = signal(false);
  isPasswordVisible = signal(false);

  ngControl: NgControl | null = null;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }


  get resolvedType(): string {
    if (this.type !== 'password') return this.type;
    return this.isPasswordVisible() ? 'text' : 'password';
  }


  get errorMessage(): string | null {
    const ctrl = this.ngControl?.control;
    if (!ctrl || !ctrl.invalid || !ctrl.touched) return null;

    if (ctrl.errors?.['required']) return 'This field is required';
    if (ctrl.errors?.['email']) return 'Please enter a valid email.';
    if (ctrl.errors?.['minlength']) {
      return `Minimum ${ctrl.errors['minlength'].requiredLength} characters.`;
    }

    const firstKey = Object.keys(ctrl.errors ?? {})[0];
    return firstKey ?? 'Invalid value.';
  }


  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

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

  togglePasswordVisibility(): void {
    this.isPasswordVisible.update(v => !v);
  }
}