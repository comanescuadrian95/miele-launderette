import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCycles } from './create-cycles';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeviceEnhanced } from '../../models/device.model';
import { of, throwError } from 'rxjs';

class ApiServiceStub {
  dataBundler = {
    value: () => ({ devices: [], tariffs: [], cycles: [] }),
    reload: jasmine.createSpy('reload'),
  };
  postCycle = jasmine.createSpy('postCycle').and.returnValue(of({}));
}

class MatSnackBarStub {
  open = jasmine.createSpy('open');
}

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

describe('CreateCycles', () => {
  let fixture: ComponentFixture<CreateCycles>;
  let component: CreateCycles;
  let apiService: ApiServiceStub;
  let snackBar: MatSnackBarStub;
  let router: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateCycles, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ApiService, useClass: ApiServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: Router, useClass: RouterStub },
      ],
    });
    fixture = TestBed.createComponent(CreateCycles);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as any;
    snackBar = TestBed.inject(MatSnackBar) as any;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reload on init', () => {
    expect(apiService.dataBundler.reload).toHaveBeenCalled();
  });

  it('should patch device form on device select', () => {
    const device: DeviceEnhanced = {
      id: '1',
      name: 'Test',
      type: 'washer',
      tariffId: 1,
      price: 2.5,
      currency: 'EUR',
    };

    component.onDeviceSelected(device);

    expect(component.deviceForm.value.selectedDevice).toEqual(device);
  });

  it('should show error if no device selected on submit', () => {
    component.userForm.setValue({ userId: 'alex' });
    component.deviceForm.setValue({ selectedDevice: null });
    component.submitStepperForm();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Error: No device selected.',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should post cycle and navigate on success', () => {
    const device: DeviceEnhanced = {
      id: '1',
      name: 'Test',
      type: 'washer',
      tariffId: 1,
      price: 2.5,
      currency: 'EUR',
    };

    component.userForm.setValue({ userId: 'alex' });
    component.deviceForm.setValue({ selectedDevice: device });
    apiService.postCycle.and.returnValue(of({}));
    component.submitStepperForm();

    expect(apiService.postCycle).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Cycle created successfully!',
      'Close',
      jasmine.any(Object)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/cycles-list']);
  });

  it('should show error on cycle post failure', () => {
    const device: DeviceEnhanced = {
      id: '1',
      name: 'Test',
      type: 'washer',
      tariffId: 1,
      price: 2.5,
      currency: 'EUR',
    };

    component.userForm.setValue({ userId: 'alex' });
    component.deviceForm.setValue({ selectedDevice: device });
    apiService.postCycle.and.returnValue(throwError(() => new Error('fail')));
    component.submitStepperForm();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Error creating cycle. Please try again.',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should build cycle with correct values', () => {
    const device: DeviceEnhanced = {
      id: '1',
      name: 'Test',
      type: 'washer',
      tariffId: 1,
      price: 2.5,
      currency: 'EUR',
    };
    const cycle = (component as any)._buildCycle('alex', device);

    expect(cycle.userId).toBe('alex');
    expect(cycle.deviceId).toBe('1');
    expect(cycle.invoiceLines[0].name).toBe('Test');
    expect(cycle.invoiceLines[0].totalPrice).toBe(2.5);
    expect(cycle.invoiceLines[0].currency).toBe('EUR');
  });
});
