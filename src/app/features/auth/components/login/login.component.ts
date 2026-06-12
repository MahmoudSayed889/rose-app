import { Component } from '@angular/core';
import { SpLineComponent } from "../../../../shared/components/sp-line/sp-line.component";
import { RouterLink } from "@angular/router";
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent, ButtonComponent } from 'reusable-components'

@Component({
  selector: 'app-login',
  imports: [SpLineComponent, InputComponent, RouterLink, CheckboxModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  login() {
    console.log('login btn work');
  }
}
