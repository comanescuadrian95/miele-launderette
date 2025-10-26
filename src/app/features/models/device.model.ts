export type DeviceType = "washer" | "dryer" | "unknown";

export interface Device {
  type: DeviceType;
  id: string;
  name: string;
  tariffId: number;
}