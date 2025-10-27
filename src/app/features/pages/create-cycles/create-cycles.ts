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

  // Descriptive form groups and controls
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

    console.log('Stepper Form Data:', {
      userId,
      selectedDevice, // This is the full device object
    });

    // Here you would send the data to your API
  }
}
