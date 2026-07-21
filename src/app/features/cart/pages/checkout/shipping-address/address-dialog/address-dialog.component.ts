import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { ButtonComponent, InputComponent } from 'reusable-components';
import { NgClass } from '@angular/common';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { StepperModule } from 'primeng/stepper';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address, CreateAddressRequest } from '../../../../models/checkout/addresses';
import { AppComponentBase } from '../../../../../../shared/app-component-base';
import { AddressService } from '../../../../services/checkout/address.service';
import { ConfirmationService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';
import { icons, LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-address-dialog',
  imports: [
    ButtonComponent,
    TranslatePipe,
    InputComponent,
    ListboxModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    NgClass,
    GoogleMap,
    MapMarker,
    StepperModule,
    ConfirmDialogModule,
    LucideAngularModule,
    TextareaModule,
    CheckboxModule
  ],
  templateUrl: './address-dialog.component.html',
  styleUrl: './address-dialog.component.scss',
  providers: [ConfirmationService]
})
export class AddressDialogComponent extends AppComponentBase implements OnInit {

  private readonly _confirmationService = inject(ConfirmationService);
  private readonly _addressService = inject(AddressService)
  private fb = inject(FormBuilder)

  addresses = this._addressService.addresses
  selectedAddress = signal<Address | null>(null)
  address = signal<Address | null>(null);
  addressId = signal<string>('');

  visible = model<boolean>(false)
  visibleForm = signal<boolean>(false)

  form!: FormGroup
  currentStep = signal<number>(1);

  center: google.maps.LatLngLiteral = { lat: 29.892028599760405, lng: 31.275635871843352 };
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  icons = icons

  @Output() saved = new EventEmitter<void>();

  ngOnInit(): void {
    this.getAddresses()
    this.createForm()
  }

  getAddresses() {
    this._addressService.getAddresses().subscribe({
      next: (res) => {
        this._addressService.addresses.set(res.payload.addresses)
      }
    })
  }

  getAddress(addressId: string) {
    this._addressService.getAddress(addressId).subscribe({
      next: (res) => {
        this.addressId.set(addressId)
        this.address.set(res.payload.address)
        this.createForm(this.address())
        this.visibleForm.set(true)
      }
    })
  }

  createForm(data?: Address | null) {
    this.form = this.fb.group({
      title: [data?.title || '', Validators.required],
      isPrimary: [data?.isPrimary || false, Validators.required],
      city: [data?.city || '', Validators.required],
      street: [data?.street || '', Validators.required],
      phone: [data?.phone || '', Validators.required],
      latitude: [Number(data?.latitude) || 0, Validators.required],
      longitude: [Number(data?.longitude) || 0, Validators.required],
    })

    if (data) {
      this.markerPosition = {
        lat: Number(data?.latitude),
        lng: Number(data?.longitude),
      }
      this.center = this.markerPosition
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()

      this.markerPosition = { lat, lng }
      this.form.get('latitude')?.setValue(this.markerPosition.lat)
      this.form.get('longitude')?.setValue(this.markerPosition.lng)
    }
  }

  afterSubmited() {
    this.formSubmited.set(false)
    this.getAddresses()
    this.visible.set(false);
    this.visibleForm.set(false);
    this.createForm()
    this.currentStep.set(1)
    this.saved.emit();
  }

  createOrUpdateAddress() {
    const formValues = this.form.value as CreateAddressRequest
    if (
      this.form.invalid ||
      !formValues.latitude ||
      !formValues.longitude
    ) {
      this._toastService.toaster('error', this.isDirRtl() ? 'يجب عليك تحديد موقعك على الخريطة وملء جميع الحقول المطلوبة' : 'You must specify your location on the map and fill in all required fields')
      return
    }

    this.formSubmited.set(true)
    const dataToSend = {
      title: formValues.title,
      isPrimary: formValues.isPrimary,
      city: formValues.city,
      street: formValues.street,
      phone: formValues.phone,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
    } as CreateAddressRequest


    if (this.address() != null && this.addressId() != '') {
      this._addressService.updateAddress(this.addressId(), dataToSend).subscribe({
        next: () => {
          this.afterSubmited()
          this._toastService.toaster('success', this.isDirRtl() ? 'تم تحديث عنوانك بنجاح' : 'Address updated successfully')
        }, error: () => {
          this.formSubmited.set(false)
        }
      })
    } else {
      this._addressService.createAddress(dataToSend).subscribe({
        next: () => {
          this.afterSubmited()
          this._toastService.toaster('success', this.isDirRtl() ? 'تم إضافة العنوان بنجاح' : 'Address added successfully')
        }, error: () => {
          this.formSubmited.set(false)
        }
      })
    }
  }

  deleteAddress(addressId: string) {
    this._confirmationService.confirm({
      message: this.isDirRtl() ? 'هل أنت متأكد من رغبتك في حذف هذا العنوان؟' : 'Are you sure you want to delete this address?',
      icon: 'pi pi-trash',
      rejectButtonProps: {
        label: this.isDirRtl() ? 'إالغاء' : 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: this.isDirRtl() ? 'تأكيد' : 'Confirm',
        severity: 'danger'
      },
      accept: () => {
        this._addressService.deleteAddress(addressId).subscribe({
          next: (res) => {
            this._toastService.toaster('success', this.isDirRtl() ? 'تم حذف العنوان بنجاح' : 'Address deleted successfully')
            this.afterSubmited()
          }
        })
      },
      reject: () => {
      }
    });
  }
}
