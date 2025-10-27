import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ApiService } from '../../services/api.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Cycle } from '../../models/cycle.model';
import { MatIcon } from '@angular/material/icon';
import { getEnhancedDevice } from '../../utils/utils';
import { CardDevice } from '../../components/card-device/card-device';
import { DeviceEnhanced } from '../../models/device.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-cycles',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIcon,
    CardDevice,
  ],
  standalone: true,
  templateUrl: './create-cycles.html',
  styleUrl: './create-cycles.scss',
})
export class CreateCycles {
  private _router = inject(Router);

  constructor() {
    effect(() => {
      this._apiService.dataBundler.reload();
    });
  }

  protected readonly devices = computed(() => {
    const devices = this._apiService.dataBundler.value()?.devices;
    const tariffs = this._apiService.dataBundler.value()?.tariffs;

    return getEnhancedDevice(devices, tariffs);
  });

  protected readonly users = computed<string[]>(() => {
    let users: string[] = [];
    const dataBundler = this._apiService.dataBundler.value();

    if (!dataBundler?.cycles) return users;

    users = dataBundler.cycles
      .filter(
        (cycle: Cycle, index: number, self: Cycle[]) =>
          self.findIndex((c) => c.userId === cycle.userId) === index
      )
      .map((cycle: Cycle) => cycle.userId);

    return users;
  });

  private _formBuilder = inject(FormBuilder);
  private _apiService = inject(ApiService);
  private _snackBar = inject(MatSnackBar);

  userStepForm = this._formBuilder.group({
    userId: [''],
  });

  deviceStepForm = this._formBuilder.group({
    selectedDevice: [null as DeviceEnhanced | null, Validators.required],
  });

  isLinear = true;

  submitStepperForm() {
    const userId = this.userStepForm.value.userId || 'unknown';
    const selectedDevice = this.deviceStepForm.value.selectedDevice;
    const cycles = this._apiService.dataBundler.value()?.cycles ?? [];
    const nextId =
      cycles.length > 0 ? (Math.max(...cycles.map((c) => Number(c.id) || 0)) + 1).toString() : '1';

    const now = new Date().toISOString();

    if (!selectedDevice) {
      this._snackBar.open('Error: No device selected.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      return;
    }

    const cycle: Cycle = {
      startedAt: now,
      stoppedAt: now,
      status: 'in-progress', // or set as needed
      userId,
      userAgent: navigator.userAgent,
      deviceId: selectedDevice.id,
      id: nextId,
      invoiceLines: [],
    };

    this._apiService.postCycle(cycle).subscribe({
      next: (cycle) => {
        this._snackBar.open('Cycle created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this._router.navigate(['/cycles-list']);
      },
      error: () => {
        this._snackBar.open('Error creating cycle. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
