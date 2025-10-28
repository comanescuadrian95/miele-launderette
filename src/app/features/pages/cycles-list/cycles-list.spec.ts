import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CyclesList } from './cycles-list';
import { ApiService } from '../../services/api.service';
import { Cycle, CycleEnhanced } from '../../models/cycle.model';
import { Device, DeviceEnhanced } from '../../models/device.model';

class ApiServiceStub {
  dataBundler = {
    value: (): { cycles: Cycle[]; devices: Device[]; tariffs: any[] } => ({
      cycles: [],
      devices: [],
      tariffs: [],
    }),
    reload: jasmine.createSpy('reload'),
  };
}

describe('CyclesList', () => {
  let component: CyclesList;
  let fixture: ComponentFixture<CyclesList>;
  let apiService: ApiServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CyclesList],
      providers: [{ provide: ApiService, useClass: ApiServiceStub }],
    });
    fixture = TestBed.createComponent(CyclesList);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reload on construction', () => {
    fixture.detectChanges();

    expect(apiService.dataBundler.reload).toHaveBeenCalled();
  });

  it('should return empty arrays for all tabs when no cycles', () => {
    fixture.detectChanges();

    component.tabs.forEach((tab) => {
      expect(tab.cycles()).toEqual([]);
    });
  });

  it('should return empty array if cycles is undefined', () => {
    apiService.dataBundler.value = () => ({ cycles: undefined as any, devices: [], tariffs: [] });

    fixture.detectChanges();

    expect(component.tabs[2].cycles()).toEqual([]);
  });

  it('should filter cycles by status', () => {
    const cycles: Cycle[] = [
      {
        startedAt: '2024-11-25T12:01:24.329Z',
        stoppedAt: '2024-11-25T13:01:24.329Z',
        status: 'failure',
        userId: 'alex',
        userAgent: 'iOS; iPhone XS; Version 13.3 (Build 17C45)) CFNetwork/1121.2.1 Darvin/19.3.0',
        deviceId: '48565',
        id: '1',
        invoiceLines: [],
      },
      {
        startedAt: '2024-11-26T12:01:24.329Z',
        stoppedAt: '2024-11-26T13:01:24.329Z',
        status: 'cancelled',
        userId: 'alex',
        userAgent: 'iOS; iPhone XS; Version 13.3 (Build 17C45)) CFNetwork/1121.2.1 Darvin/19.3.0',
        deviceId: '48567',
        id: '2',
        invoiceLines: [
          {
            name: 'Washing cycle',
            totalPrice: 2.5,
            currency: 'EUR',
          },
        ],
      },
      {
        startedAt: '2024-11-27T12:01:24.329Z',
        stoppedAt: '2024-11-27T13:01:24.329Z',
        status: 'completed',
        userId: 'nick',
        userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/3.1)',
        deviceId: '48565',
        id: '3',
        invoiceLines: [
          {
            name: 'Washing cycle',
            totalPrice: 3.5,
            currency: 'EUR',
          },
        ],
      },
      {
        startedAt: '2024-11-28T12:01:24.329Z',
        stoppedAt: '2024-11-28T13:01:24.329Z',
        status: 'in-progress',
        userId: 'michi',
        userAgent: 'iOS; iPhone XS; Version 13.3 (Build 17C45)) CFNetwork/1121.2.1 Darvin/19.3.0',
        deviceId: '48567',
        id: '4',
        invoiceLines: [],
      },
    ];

    apiService.dataBundler.value = () => ({ cycles, devices: [], tariffs: [] });
    fixture.detectChanges();

    const activeCycles = component.tabs[0].cycles();

    expect(activeCycles.length).toBe(1);
    expect(activeCycles[0].id).toBe('4');

    const historyCycles = component.tabs[1].cycles();

    expect(historyCycles.length).toBe(3);
    expect(historyCycles[0].id).toBe('1');
    expect(historyCycles[1].id).toBe('2');

    const allCycles = component.tabs[2].cycles();

    expect(allCycles.length).toBe(4);
  });

  it('should return enhanced cycles using getEnhancedCycle', () => {
    const cycles: Cycle[] = [
      {
        startedAt: '2024-11-25T12:01:24.329Z',
        stoppedAt: '2024-11-25T13:01:24.329Z',
        status: 'failure',
        userId: 'alex',
        userAgent: 'iOS; iPhone XS; Version 13.3 (Build 17C45)) CFNetwork/1121.2.1 Darvin/19.3.0',
        deviceId: '48565',
        id: '1',
        invoiceLines: [],
      },
      {
        startedAt: '2024-11-26T12:01:24.329Z',
        stoppedAt: '2024-11-26T13:01:24.329Z',
        status: 'cancelled',
        userId: 'alex',
        userAgent: 'iOS; iPhone XS; Version 13.3 (Build 17C45)) CFNetwork/1121.2.1 Darvin/19.3.0',
        deviceId: '48567',
        id: '2',
        invoiceLines: [
          {
            name: 'Washing cycle',
            totalPrice: 2.5,
            currency: 'EUR',
          },
        ],
      },
      {
        startedAt: '2024-11-27T12:01:24.329Z',
        stoppedAt: '2024-11-27T13:01:24.329Z',
        status: 'completed',
        userId: 'nick',
        userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 5.1; Trident/3.1)',
        deviceId: '48565',
        id: '3',
        invoiceLines: [
          {
            name: 'Washing cycle',
            totalPrice: 3.5,
            currency: 'EUR',
          },
        ],
      },
    ];

    const devices: DeviceEnhanced[] = [
      {
        id: '48565',
        name: 'Big washing machine',
        type: 'washer',
        tariffId: 1,
        price: 3.5,
        currency: 'EUR',
      },
      {
        id: '48567',
        name: 'Small washing machine',
        type: 'washer',
        tariffId: 2,
        price: 2.5,
        currency: 'EUR',
      },
      {
        id: '48111',
        name: 'Little giant dryer',
        type: 'dryer',
        tariffId: 3,
        price: 1.5,
        currency: 'EUR',
      },
    ];

    const tariffs: any[] = [
      { id: '1', name: 'Big washing machine tariff', price: 3.5, currency: 'EUR' },
      { id: '2', name: 'Small washing machine tariff', price: 2.5, currency: 'EUR' },
      { id: '3', name: 'Drying tariff', price: 1.5, currency: 'EUR' },
    ];

    apiService.dataBundler.value = () => ({ cycles, devices, tariffs });

    fixture.detectChanges();

    const allCycles = component.tabs[2].cycles() as CycleEnhanced[];

    expect(allCycles.length).toBe(3);

    expect(allCycles[0].deviceId).toBe('48565');
    expect(allCycles[0].deviceName).toBe('Big washing machine');
    expect(allCycles[0].price).toBe(3.5);
    expect(allCycles[0].currency).toBe('EUR');

    expect(allCycles[1].deviceId).toBe('48567');
    expect(allCycles[1].deviceName).toBe('Small washing machine');
    expect(allCycles[1].price).toBe(2.5);
    expect(allCycles[1].currency).toBe('EUR');

    expect(allCycles[2].deviceId).toBe('48565');
    expect(allCycles[2].deviceName).toBe('Big washing machine');
    expect(allCycles[2].price).toBe(3.5);
    expect(allCycles[2].currency).toBe('EUR');
  });
});
