import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Invoice } from '../../models';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, MatIcon, MatButtonModule, CommonModule],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceList {
  public invoices = input<Invoice[]>();

  constructor(
    public dialogRef: MatDialogRef<InvoiceList>,
    @Inject(MAT_DIALOG_DATA) public data: { invoices: Invoice[] }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
