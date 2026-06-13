import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { SpLineComponent } from "../../../../../shared/components/sp-line/sp-line.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent, ButtonComponent } from "reusable-components";

@Component({
  selector: 'app-send-email',
  imports: [SpLineComponent, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent {
  private readonly _fb = inject(FormBuilder);

  isLoading = input<boolean>(false);
  @Output() emailSubmitted = new EventEmitter<string>();

  sendEmailForm: FormGroup = this._fb.group({
    email: [null, [Validators.email, Validators.required]]
  })

  onSubmit(): void {
    if(this.sendEmailForm.valid) {
      const emailValue = this.sendEmailForm.value.email
      this.emailSubmitted.emit(emailValue);    
    }
    else {
      console.log('no no no');
      
    }
  }

}
