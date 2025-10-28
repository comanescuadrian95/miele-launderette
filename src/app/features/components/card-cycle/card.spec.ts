import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { CycleEnhanced } from '../../models/cycle.model';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceList } from '../invoice-list';

class MatDialogStub {
  open = jasmine.createSpy('open');
}

describe('Card', () => {
  let fixture: ComponentFixture<Card>;
  let component: Card;
  let dialogStub: MatDialogStub;

  const mockCycle: CycleEnhanced = {
    id: '1',
    startedAt: '2024-11-25T12:01:24.329Z',
    stoppedAt: '2024-11-25T13:01:24.329Z',
    status: 'completed',
    userId: 'alex',
    userAgent: 'iOS',
    deviceId: '48565',
    deviceName: 'Big washing machine',
    price: 3.5,
    currency: 'EUR',
    invoiceLines: [{ name: 'Washing cycle', totalPrice: 3.5, currency: 'EUR' }],
    deviceType: 'washer',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Card],
      providers: [{ provide: MatDialog, useClass: MatDialogStub }],
    });
    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    dialogStub = TestBed.inject(MatDialog) as any;
    fixture.componentRef.setInput('cycle', mockCycle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have cycle input set', () => {
    expect(component.cycle()).toEqual(mockCycle);
  });

  it('should open dialog with invoice details when onCheckInvoiceDetails is called', () => {
    component.onCheckInvoiceDetails();

    expect(dialogStub.open).toHaveBeenCalled();

    const args = dialogStub.open.calls.mostRecent().args;

    expect(args[0]).toBe(InvoiceList);
    expect(args[1].data.invoices).toEqual(mockCycle.invoiceLines);
  });
});
