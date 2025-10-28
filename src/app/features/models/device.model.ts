export type deviceType = 'washer' | 'dryer' | 'unknown';

export interface Device {
  type: deviceType;
  id: string;
  name: string;
  tariffId: number;
}

export interface DeviceEnhanced extends Device {
  price: number;
  currency: string;
}
