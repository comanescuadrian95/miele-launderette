import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CycleEnhanced } from '../../models/cycle.model';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceList } from '../invoice-list';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatChip, MatChipSet, MatIcon, DatePipe, DecimalPipe,MatButton],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  private _dialog = inject(MatDialog);
  
  public cycle = input.required<CycleEnhanced>();

  protected onCheckInvoiceDetails(): void {
    this._dialog.open(InvoiceList, {
      data: {
        invoices: this.cycle().invoiceLines,
      },
    });
  }
}