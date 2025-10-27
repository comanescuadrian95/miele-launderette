import { Component, computed, effect, inject } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../../components/card-cycle/card';
import { ApiService } from '../../services/api.service';
import { Cycle, CycleEnhanced, CycleStatus } from '../../models/cycle.model';
import { getEnhancedCycle } from '../../utils/utils';

@Component({
  selector: 'app-cycles-list',
  standalone: true,
  imports: [MatTabGroup, MatTab, Card],
  templateUrl: './cycles-list.html',
  styleUrl: './cycles-list.scss',
})
export class CyclesList {
  private _apiService = inject(ApiService);

  constructor() {
    effect(() => {
      this._apiService.dataBundler.reload();
    });
  }

  readonly tabs = [
    { label: 'ACTIVE', cycles: computed(() => this._getEnhancedCycleByStatus('in-progress')) },
    { label: 'HISTORY', cycles: computed(() => this._getEnhancedCycleByStatus('not-in-progress')) },
    { label: 'ALL', cycles: computed(() => this._getEnhancedCycleByStatus()) },
  ];

  private _getEnhancedCycleByStatus(status?: string): CycleEnhanced[] {
    const cycles = this._apiService.dataBundler.value()?.cycles;
    const devices = this._apiService.dataBundler.value()?.devices;
    const tariffs = this._apiService.dataBundler.value()?.tariffs;

    if (!cycles) {
      return [];
    }

    if (!status) {
      // No status: return all
      return getEnhancedCycle(cycles, devices, tariffs);
    }

    let filteredCycles: Cycle[];

    if (status === 'in-progress') {
      filteredCycles = cycles.filter((cycle: Cycle) => cycle.status === 'in-progress');
    } else {
      filteredCycles = cycles.filter((cycle: Cycle) => cycle.status !== 'in-progress');
    }

    return getEnhancedCycle(filteredCycles, devices, tariffs);
  }
}
