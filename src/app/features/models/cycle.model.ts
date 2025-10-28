import { deviceType } from './device.model';
import { Invoice } from './invoice.model';

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
  deviceType: deviceType;
  deviceName: string;
  price: number;
  currency: string;
}
