import { getEnhancedDevice, getEnhancedCycle } from './utils';

describe('getEnhancedDevice', () => {
  it('should return empty array if devices is undefined', () => {
    expect(getEnhancedDevice(undefined, [])).toEqual([]);
  });

  it('should enhance devices with tariff info', () => {
    const devices = [
      { id: '1', name: 'A', type: 'washer', tariffId: 2 },
      { id: '2', name: 'B', type: 'dryer', tariffId: 3 },
    ] as import('../models/device.model').Device[];

    const tariffs = [
      { id: '2', name: 'T1', price: 5, currency: 'EUR' },
      { id: '3', name: 'T2', price: 7, currency: 'USD' },
    ] as import('../models/tariff.model').Tariff[];

    const result = getEnhancedDevice(devices, tariffs);

    expect(result[0].price).toBe(5);
    expect(result[0].currency).toBe('EUR');
    expect(result[1].price).toBe(7);
    expect(result[1].currency).toBe('USD');
  });

  it('should default price/currency if no matching tariff', () => {
    const devices = [
      { id: '1', name: 'A', type: 'washer', tariffId: 99 },
    ] as import('../models/device.model').Device[];

    const tariffs = [
      { id: '2', name: 'T1', price: 5, currency: 'EUR' },
    ] as import('../models/tariff.model').Tariff[];

    const result = getEnhancedDevice(devices, tariffs);

    expect(result[0].price).toBe(0);
    expect(result[0].currency).toBe('N/A');
  });
});

describe('getEnhancedCycle', () => {
  it('should return empty array if cycles is undefined', () => {
    expect(getEnhancedCycle(undefined, [], [])).toEqual([]);
  });

  it('should enhance cycles with device and tariff info', () => {
    const cycles = [
      {
        id: 'c1',
        deviceId: '1',
        startedAt: '',
        stoppedAt: '',
        status: 'completed',
        userId: 'u1',
        userAgent: '',
        invoiceLines: [],
      },
      {
        id: 'c2',
        deviceId: '2',
        startedAt: '',
        stoppedAt: '',
        status: 'completed',
        userId: 'u2',
        userAgent: '',
        invoiceLines: [],
      },
    ] as import('../models/cycle.model').Cycle[];

    const devices = [
      { id: '1', name: 'A', type: 'washer', tariffId: 2 },
      { id: '2', name: 'B', type: 'dryer', tariffId: 3 },
    ] as import('../models/device.model').Device[];

    const tariffs = [
      { id: '2', name: 'T1', price: 5, currency: 'EUR' },
      { id: '3', name: 'T2', price: 7, currency: 'USD' },
    ] as import('../models/tariff.model').Tariff[];

    const result = getEnhancedCycle(cycles, devices, tariffs);

    expect(result[0].deviceName).toBe('A');
    expect(result[0].deviceType).toBe('washer');
    expect(result[0].price).toBe(5);
    expect(result[0].currency).toBe('EUR');
    expect(result[1].deviceName).toBe('B');
    expect(result[1].deviceType).toBe('dryer');
    expect(result[1].price).toBe(7);
    expect(result[1].currency).toBe('USD');
  });

  it('should default device/tariff info if not found', () => {
    const cycles = [
      {
        id: 'c1',
        deviceId: '99',
        startedAt: '',
        stoppedAt: '',
        status: 'completed',
        userId: 'u1',
        userAgent: '',
        invoiceLines: [],
      },
    ] as import('../models/cycle.model').Cycle[];

    const devices = [
      { id: '1', name: 'A', type: 'washer', tariffId: 2 },
    ] as import('../models/device.model').Device[];

    const tariffs = [
      { id: '2', name: 'T1', price: 5, currency: 'EUR' },
    ] as import('../models/tariff.model').Tariff[];

    const result = getEnhancedCycle(cycles, devices, tariffs);

    expect(result[0].deviceName).toBe('Unknown Device');
    expect(result[0].deviceType).toBe('unknown');
    expect(result[0].price).toBe(0);
    expect(result[0].currency).toBe('N/A');
  });
});
