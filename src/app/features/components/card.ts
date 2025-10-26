import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Cycle, CycleEnhanced } from '../models/cycle.model';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatChip, MatButton, MatChipSet, MatIcon, DatePipe, DecimalPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public cycle = input.required<CycleEnhanced>();
}
