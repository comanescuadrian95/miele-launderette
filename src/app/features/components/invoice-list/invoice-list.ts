import { ChangeDetectionStrategy, Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../models/invoice.model';

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
