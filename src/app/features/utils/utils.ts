import { Device } from '../models/device.model';
import { Tariff } from '../models/tariff.mode';


export function formatCycleDate(dateString: string, locale = 'en-GB'): string {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function findTariffForDevice(device: Device, tariffs: Tariff[]): Tariff | undefined {
  return tariffs.find((tariff) => String(tariff.id) === String(device.tariffId));
}
