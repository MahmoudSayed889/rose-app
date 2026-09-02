import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardLayout } from "./core/layout/dashboard-layout/dashboard-layout";

@Component({
  imports: [RouterModule, DashboardLayout],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'dashboard';
}
