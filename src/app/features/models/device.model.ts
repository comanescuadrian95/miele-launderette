export type DeviceType = 'washer' | 'dryer' | 'unknown';

export interface Device {
  type: DeviceType;
  id: string;
  name: string;
  tariffId: number;
}

export interface DeviceEnhanced extends Device {
  price: number;
  currency: string;
}
