import {
  Component,
  forwardRef,
  inject,
  Injector,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';

export interface ICountry {
  name: string;
  shortName: string;
  code: string;
  flag: string;
  placeHolder: string;
}

@Component({
  selector: 'lib-phone-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
  host: {
    class: 'w-full',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent {
  private injector = inject(Injector);

  selectedCountry: ICountry = {
    name: 'Egypt',
    shortName: 'EG',
    code: '+20',
    flag: 'assets/imgs/Flags/flag-egypt.png',
    placeHolder: '1012345678',
  };
  countries: ICountry[] = [
    {
      name: 'Palestine',
      shortName: 'PS',
      code: '+970',
      flag: 'assets/imgs/Flags/flag-palestine.png',
      placeHolder: '59 900 0000',
    },
    {
      name: 'Syria',
      shortName: 'SY',
      code: '+963',
      flag: 'assets/imgs/Flags/flag-Syria.png',
      placeHolder: '094 095 096',
    },
    {
      name: 'Egypt',
      shortName: 'EG',
      code: '+20',
      flag: 'assets/imgs/Flags/flag-egypt.png',
      placeHolder: '1012345678',
    },
    {
      name: 'Saudi',
      shortName: 'SA',
      code: '+966',
      flag: 'assets/imgs/Flags/flag-Saudi.png',
      placeHolder: '11 400 0000',
    },
  ];

  getCountry(countryName: string): ICountry | undefined {
    return this.countries.find((c) => c.name == countryName);
  }
  selectCountry(countryName: string) {
    const country: ICountry | undefined = this.getCountry(countryName);
    if (country) {
      this.selectedCountry = country;
    }
    this.isListOpen.set(false);
  }

  isListOpen: WritableSignal<boolean> = signal(false);
  toggleList(): void {
    this.isListOpen.set(!this.isListOpen());
  }

  @Input() label = '';
  @Input() inputId!: string;
  @Input() styleClass = '';
  @Input() valid: boolean = false;
  @Input() customErrorMessages: Record<string, string> = {};

  @Input() set disabled(value: boolean) {
    this.isDisabled.set(value);
  }

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
