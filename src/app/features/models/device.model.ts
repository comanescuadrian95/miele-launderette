export type DeviceType = "washer" | "dryer";

export interface Device {
  type: DeviceType;
  id: string;
  name: string;
  tariffId: number;
}