import { Component, computed, effect, inject, OnInit, resource } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../../components/card-cycle/card';
import { ApiService } from '../../services/api.service';
import { Cycle, CycleEnhanced, CycleStatus } from '../../models/cycle.model';
import { getEnhancedCycle } from '../../utils/utils';

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [MatTabGroup, MatTab, Card],
  templateUrl: './cycles.html',
  styleUrl: './cycles.scss',
})
export class Cycles {
  private _apiService = inject(ApiService);

  constructor() {
    effect(() => {
      this._apiService.dataBundler.reload();
    });
  }

  readonly tabs = [
    { label: 'ALL', cycles: computed(() => this._getEnhancedCycleByStatus()) },
    { label: 'IN PROGRESS', cycles: computed(() => this._getEnhancedCycleByStatus('in-progress')) },
    { label: 'COMPLETED', cycles: computed(() => this._getEnhancedCycleByStatus('completed')) },
    { label: 'CANCELLED', cycles: computed(() => this._getEnhancedCycleByStatus('cancelled')) },
    { label: 'FAILED', cycles: computed(() => this._getEnhancedCycleByStatus('failure')) },
  ];

  private _getEnhancedCycleByStatus(status?: CycleStatus): CycleEnhanced[] {
    const cycles = this._apiService.dataBundler.value()?.cycles;
    const devices = this._apiService.dataBundler.value()?.devices;
    const tariffs = this._apiService.dataBundler.value()?.tariffs;

    if (!cycles) {
      return [];
    }

    if (!status) {
      return getEnhancedCycle(cycles, devices, tariffs);
    }

    const filteredCycles = cycles?.filter((cycle: Cycle) => cycle.status === status);

    return getEnhancedCycle(filteredCycles, devices, tariffs);
  }
}
