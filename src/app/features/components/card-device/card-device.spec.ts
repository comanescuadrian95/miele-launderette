import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDevice } from './card-device';
import { DeviceEnhanced } from '../../models/device.model';

describe('CardDevice', () => {
  let fixture: ComponentFixture<CardDevice>;
  let component: CardDevice;

  const mockDevice: DeviceEnhanced = {
    id: '123',
    name: 'Test Device',
    type: 'washer',
    tariffId: 1,
    price: 2.5,
    currency: 'EUR',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardDevice],
    });
    fixture = TestBed.createComponent(CardDevice);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('device', mockDevice);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selected to false by default', () => {
    expect(component.selected()).toBe(false);
  });

  it('should update selected when selectedInput changes', () => {
    fixture.componentRef.setInput('selectedInput', true);
    fixture.detectChanges();

    expect(component.selected()).toBe(true);
  });

  it('should not emit selectedChange if already selected', () => {
    fixture.componentRef.setInput('selectedInput', true);
    fixture.detectChanges();

    spyOn(component.selectedChange, 'emit');

    component.selectDevice();

    expect(component.selectedChange.emit).not.toHaveBeenCalled();
  });
});

describe('CardDevice (selectDevice, no selectedInput)', () => {
  it('should update selected when writeValue is called', () => {
    expect(component.selected()).toBe(false);

    component.writeValue(true);

    expect(component.selected()).toBe(true);

    component.writeValue(false);

    expect(component.selected()).toBe(false);
  });

  let fixture: ComponentFixture<CardDevice>;
  let component: CardDevice;

  const mockDevice: DeviceEnhanced = {
    id: '123',
    name: 'Test Device',
    type: 'washer',
    tariffId: 1,
    price: 2.5,
    currency: 'EUR',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardDevice],
    });
    fixture = TestBed.createComponent(CardDevice);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('device', mockDevice);
    fixture.detectChanges();
  });

  it('should emit selectedChange and call onChange/onTouched when device card is clicked and not selected', () => {
    spyOn(component.selectedChange, 'emit');

    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);
    fixture.detectChanges();
    component.selectDevice();
    fixture.detectChanges();

    expect(component.selected()).toBe(true);
    expect(component.selectedChange.emit).toHaveBeenCalledWith('123');
    expect(onChangeSpy).toHaveBeenCalledWith(true);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
