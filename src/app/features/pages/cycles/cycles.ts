import { Component, computed, effect, inject, OnInit, resource } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../../components/card';
import { DataBundle } from '../../models/bundle.model';
import { ApiService } from '../../services/api.service';
import { Cycle, CycleEnhanced } from '../../models/cycle.model';
import { Device } from '../../models/device.model';
import { Tariff } from '../../models/tariff.mode';

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [MatTabGroup, MatTab, Card],
  templateUrl: './cycles.html',
  styleUrl: './cycles.scss',
})
export class Cycles {
  private _apiService = inject(ApiService);

  protected readonly tariffs = computed(() => this._apiService.dataBundler.value()?.tariffs);
  protected readonly devices = computed(() => this._apiService.dataBundler.value()?.devices);
  protected readonly cycles = computed(() =>
    this._getEnhancedCycle(this._apiService.dataBundler.value()?.cycles)
  );

  protected readonly inProgressCycles = computed(() => {
    const inProgressCycles = this.cycles()?.filter((cycle) => cycle.status === 'in-progress');

    return this._getEnhancedCycle(inProgressCycles);
  });
  protected readonly completedCycles = computed(() => {
    const completedCycles = this.cycles()?.filter((cycle) => cycle.status === 'completed');

    return this._getEnhancedCycle(completedCycles);
  });

  protected readonly cancelledCycles = computed(() => {
    const cancelledCycles = this.cycles()?.filter((cycle) => cycle.status === 'cancelled');

    return this._getEnhancedCycle(cancelledCycles);
  });

  protected readonly failureCycles = computed(() => {
    const failureCycles = this.cycles()?.filter((cycle) => cycle.status === 'failure');

    return this._getEnhancedCycle(failureCycles);
  });

  private _getEnhancedCycle = (cycles: Cycle[] | undefined): CycleEnhanced[] => {
    if (!cycles) {
      return [];
    }

    return cycles.map((cycle) => {
      const device: Device | undefined = this.devices()?.find(
        (device) => device.id === cycle.deviceId
      );
      const tariff: Tariff | undefined = this.tariffs()?.find(
        (tariff) => tariff.id === String(device?.tariffId)
      );

      return {
        ...cycle,
        DeviceName: device?.name ?? 'Unknown Device',
        DeviceType: device?.type ?? 'unknown',
        price: tariff?.price ?? 0,
        currency: tariff?.currency ?? 'N/A',
      };
    });
  };
}
