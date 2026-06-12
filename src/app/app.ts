import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InputTextModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rose-app');
}
