import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    } else {
        const errors = { ...confirmPassword.errors };
        delete errors?.['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
}