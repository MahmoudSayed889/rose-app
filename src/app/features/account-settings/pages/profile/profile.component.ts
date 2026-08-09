import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { InputComponent, PhoneInputComponent, ButtonComponent } from 'reusable-components';
import { TranslatePipe } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../../../../core/services/image.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileUser } from '../../models/profile-interface';

@Component({
  selector: 'app-profile',
  imports: [InputComponent, TranslatePipe, PhoneInputComponent, ButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends AppComponentBase implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly imageService = inject(ImageService);
  private readonly profileService = inject(ProfileService);

  profileData: WritableSignal<ProfileUser | null> = signal(null);

  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (res) => {
        this.uploadedImageUrl = res.payload.url;
      },
      error: (err) => console.error('خطأ أثناء الرفع:', err),
    });
  }

  getUserProfile(): void {
    this.profileService.getUserProfile().subscribe({
      next: (res) => {
        this.profileData.set(res.payload.user)
        console.log(this.profileData());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  genderOptions = [
    { label: 'auth.male', value: 'MALE' },
    { label: 'auth.female', value: 'FEMALE' },
  ];

  profileForm!: FormGroup;
  createForms(): void {
    this.profileForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      photo: [''],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.createForms();
  }
}
