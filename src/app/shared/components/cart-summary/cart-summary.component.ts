import { Component, input } from '@angular/core';
import { InputComponent, ButtonComponent } from "reusable-components";
import { AppComponentBase } from '../../app-component-base';
import { DecimalPipe } from '@angular/common';
import { SpLineComponent } from "../sp-line/sp-line.component";

@Component({
  selector: 'app-cart-summary',
  imports: [InputComponent, DecimalPipe, SpLineComponent, ButtonComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent extends AppComponentBase {
  subtotal = input.required<number>();
  total = input.required<number>();
}
