import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import {  MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
    public cycle = input<unknown>();
}
