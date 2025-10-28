import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceList } from './invoice-list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../models/invoice.model';

class MatDialogRefStub {
  close = jasmine.createSpy('close');
}

describe('InvoiceList', () => {
  let fixture: ComponentFixture<InvoiceList>;
  let component: InvoiceList;
  let dialogRefStub: MatDialogRefStub;

  const mockInvoices: Invoice[] = [
    { name: 'Washing cycle', totalPrice: 3.5, currency: 'EUR' },
    { name: 'Drying cycle', totalPrice: 1.5, currency: 'EUR' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvoiceList],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { invoices: mockInvoices } },
      ],
    });
    fixture = TestBed.createComponent(InvoiceList);
    component = fixture.componentInstance;
    dialogRefStub = TestBed.inject(MatDialogRef) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive invoices from dialog data', () => {
    expect(component.data.invoices).toEqual(mockInvoices);
  });

  it('should close the dialog when close() is called', () => {
    component.close();

    expect(dialogRefStub.close).toHaveBeenCalled();
  });
});
