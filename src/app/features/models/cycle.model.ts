import { Device, DeviceType } from './device.model';
import { Invoice } from './invoice.model';
import { Tariff } from './tariff.mode';

export type CycleStatus = 'failure' | 'in-progress' | 'completed' | 'cancelled';

export interface Cycle {
  startedAt: string;
  stoppedAt: string;
  status: CycleStatus;
  userId: string;
  userAgent: string;
  deviceId: string;
  id: string;
  invoiceLines: Invoice[];
}

export interface CycleEnhanced extends Cycle {
  DeviceType: DeviceType;
  DeviceName: string;
  price: number;
  currency: string;
}
