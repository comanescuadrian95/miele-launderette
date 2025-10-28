import { Component, inject, computed, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CardDevice } from '../../components';
import { DeviceEnhanced, Cycle } from '../../models';
import { ApiService } from '../../services/api.service';
import { getEnhancedDevice } from '../../utils/utils';

@Component({
  selector: 'app-create-cycles',
  imports: [
    MatButton,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatAutocompleteModule,
    CardDevice,
    MatOption,
    MatLabel,
    MatFormField,
  ],
  standalone: true,
  templateUrl: './create-cycles.html',
  styleUrl: './create-cycles.scss',
})
export class CreateCycles {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _apiService = inject(ApiService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  readonly isLinear = true;

  readonly userForm = this._formBuilder.group({
    userId: [''],
  });

  readonly deviceForm = this._formBuilder.group({
    selectedDevice: [null as DeviceEnhanced | null, Validators.required],
  });

  readonly devices = computed(() => {
    const bundle = this._apiService.dataBundler.value();

    return getEnhancedDevice(bundle?.devices, bundle?.tariffs);
  });

  readonly users = computed<string[]>(() => {
    const cycles = this._apiService.dataBundler.value()?.cycles ?? [];

    return Array.from(new Set(cycles.map((cycle) => cycle.userId))).filter(
      (userId) => userId !== 'unknown'
    );
  });

  constructor() {
    effect(() => {
      this._apiService.dataBundler.reload();
    });
  }

  onDeviceSelected(device: DeviceEnhanced): void {
    this.deviceForm.patchValue({ selectedDevice: device });
  }

  submitStepperForm(): void {
    const userId = this.userForm.value.userId || 'unknown';
    const device = this.deviceForm.value.selectedDevice;

    if (!device) {
      this._showSnackBar('Error: No device selected.');
      return;
    }

    const cycle = this._buildCycle(userId, device);

    this._apiService.postCycle(cycle).subscribe({
      next: () => {
        this._showSnackBar('Cycle created successfully!');
        this._router.navigate(['/cycles-list']);
      },
      error: () => {
        this._showSnackBar('Error creating cycle. Please try again.');
      },
    });
  }

  private _buildCycle(userId: string, device: DeviceEnhanced): Cycle {
    const cycles = this._apiService.dataBundler.value()?.cycles ?? [];
    const nextId =
      cycles.length > 0 ? (Math.max(...cycles.map((c) => Number(c.id) || 0)) + 1).toString() : '1';
    const now = new Date().toISOString();

    return {
      startedAt: now,
      stoppedAt: now,
      status: 'in-progress',
      userId,
      userAgent: navigator.userAgent,
      deviceId: device.id,
      id: nextId,
      invoiceLines: [
        {
          name: device.name,
          totalPrice: device.price,
          currency: device.currency,
        },
      ],
    };
  }

  private _showSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
