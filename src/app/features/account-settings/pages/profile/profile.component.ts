import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { InputComponent, PhoneInputComponent, ButtonComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageService } from '../../../../core/services/image.service';
import { ProfileService } from '../../services/profile.service';
import {
  ConfirmEmailChangeREQ,
  ProfileUser,
  RequestEmailChangeREQ,
  UpdateProfileREQ,
} from '../../models/profile-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    InputComponent,
    TranslatePipe,
    PhoneInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends AppComponentBase implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly imageService = inject(ImageService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  profileData: WritableSignal<ProfileUser | null> = signal(null);
  isFormValid: WritableSignal<boolean> = signal(false);
  updateProfileData: WritableSignal<UpdateProfileREQ | null> = signal(null);

  selectedFile: File | null = null;
  uploadedImageUrl: WritableSignal<string | null> = signal(null);

  phoneRegExp: RegExp = /^$|^\+?[1-9][0-9]{1,14}$/;

  profileForm: FormGroup = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    photo: [''],
    phone: ['', [Validators.pattern(this.phoneRegExp)]],
    gender: [{ value: '', disabled: true }],
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const localPreviewUrl = URL.createObjectURL(this.selectedFile);
      this.uploadedImageUrl.set(localPreviewUrl);
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        const newUrl = res.payload.url;
        this.profileForm.patchValue({ photo: newUrl });
        this.prepareData();
        this._toastService.toaster('success', 'Image uploaded successfully');
      },
      error: (err) => console.error('خطأ أثناء الرفع:', err),
    });
  }

  updateForm(): void {
    const user: ProfileUser | null = this.profileData();
    if (!user) return;

    this.profileForm.patchValue({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      photo: user.photo || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || '',
    });

    this.uploadedImageUrl.set(user.photo || null);
  }

  getUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (res) => {
        this.profileData.set(res.payload.user);
        this.updateForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // for firstName, lastName, phone, and image.
  prepareData(): void {
    const user = this.profileData();
    if (!user) return;

    const data: UpdateProfileREQ = {};

    const firstNameValue = this.profileForm.get('firstName')?.value;
    const lastNameValue = this.profileForm.get('lastName')?.value;
    const phoneControl = this.profileForm.get('phone');
    const phoneValue = phoneControl?.value;
    const photoValue = this.profileForm.get('photo')?.value;

    if (firstNameValue.trim() && firstNameValue.trim() !== this.profileData()?.firstName)
      data.firstName = firstNameValue;
    if (lastNameValue.trim() && lastNameValue.trim() !== this.profileData()?.lastName)
      data.lastName = lastNameValue;
    if (phoneControl?.valid && phoneValue.trim() && phoneValue.trim() !== this.profileData()?.phone)
      data.phone = phoneValue;
    if (photoValue.trim() && photoValue.trim() !== this.profileData()?.photo)
      data.photo = photoValue;

    this.isFormValid.set(Object.keys(data).length > 0 && this.profileForm.valid);
    if (this.isFormValid()) {
      this.updateProfileData.set(data);
    } else {
      this.updateProfileData.set(null);
    }
  }

  saveChanges(): void {
    if (!this.isFormValid() || !this.updateProfileData()) return;

    this.profileService.updateProfile(this.updateProfileData()!).subscribe({
      next: () => {
        this.getUserProfile();
        this._toastService.toaster('success', 'Profile updated successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Change Email
  openEmailForChange = signal<boolean>(false);
  isEmailControlValid = signal<boolean>(false);
  openCodeInput = signal<boolean>(false);
  isCodeControlValid = signal<boolean>(false);

  codeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  onEditEmailBtnClick(): void {
    this.profileForm.get('email')?.enable();
    this.openEmailForChange.set(true);
  }

  onEmailControlInput(): void {
    const emailControl = this.profileForm.get('email');
    if (emailControl?.value !== this.profileData()?.email && emailControl?.valid)
      this.isEmailControlValid.set(true);
    else this.isEmailControlValid.set(false);
  }

  onRequestCodeBtnClick(): void {
    if (!this.isEmailControlValid()) return;

    const data: RequestEmailChangeREQ = {
      newEmail: this.profileForm.get('email')?.value,
    };

    this.isEmailControlValid.set(false);
    this.profileService.requestEmailChange(data).subscribe({
      next: () => {
        this.openCodeInput.set(true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onConfrimEmailBtnClick(): void {
    if (this.codeControl.invalid) return;

    const data: ConfirmEmailChangeREQ = {
      code: this.codeControl.value!,
    };

    this.profileService.ConfirmEmailChange(data).subscribe({
      next: () => {
        this._toastService.toaster('success', 'Email changed successfully');
        this.resetEmailState();
        this.getUserProfile();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetEmailState(): void {
    this.openEmailForChange.set(false);
    this.openCodeInput.set(false);
    this.profileForm.get('email')?.disable();
  }

  // Delete Account
  onDeleteAccountBtnClick(): void {
    this.profileService.deleteAccount().subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getUserProfile();

    this.profileForm.valueChanges.subscribe(() => {
      this.prepareData();
    });
  }
}
