import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CycleEnhanced } from '../../models/cycle.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatChip, MatChipSet, MatIcon, DatePipe, DecimalPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public cycle = input.required<CycleEnhanced>();
}
