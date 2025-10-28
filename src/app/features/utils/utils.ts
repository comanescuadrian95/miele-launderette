import { Device, Tariff, Cycle, CycleEnhanced } from '../models';

export function getEnhancedDevice(devices: Device[] | undefined, tariffs: Tariff[] | undefined) {
  if (!devices) {
    return [];
  }

  return devices.map((device) => {
    const tariff: Tariff | undefined = tariffs?.find(
      (tariff) => tariff.id === String(device.tariffId)
    );

    return {
      ...device,
      price: tariff?.price ?? 0,
      currency: tariff?.currency ?? 'N/A',
    };
  });
}

export function getEnhancedCycle(
  cycles: Cycle[] | undefined,
  devices: Device[] | undefined,
  tariffs: Tariff[] | undefined
): CycleEnhanced[] {
  if (!cycles) {
    return [];
  }

  return cycles.map((cycle) => {
    const device: Device | undefined = devices?.find((device) => device.id === cycle.deviceId);
    const tariff: Tariff | undefined = tariffs?.find(
      (tariff) => tariff.id === String(device?.tariffId)
    );

    return {
      ...cycle,
      deviceName: device?.name ?? 'Unknown Device',
      deviceType: device?.type ?? 'unknown',
      price: tariff?.price ?? 0,
      currency: tariff?.currency ?? 'N/A',
    };
  });
}
