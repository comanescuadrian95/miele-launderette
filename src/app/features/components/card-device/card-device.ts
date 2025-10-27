import { ChangeDetectionStrategy, Component, input, output, forwardRef, signal, linkedSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { DeviceEnhanced } from '../../models/device.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-card-device',
  standalone: true,
  imports: [MatCardModule, MatChip, MatChipSet, MatIcon, DatePipe, DecimalPipe, MatRadioButton, CurrencyPipe],
  templateUrl: './card-device.html',
  styleUrl: './card-device.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardDevice),
      multi: true,
    },
  ],
})
export class CardDevice implements ControlValueAccessor {
  public device = input.required<DeviceEnhanced>();
  public selectedInput = input<boolean>();
  public selectedChange = output<string>();

  // Internal signal for selection
  private _selectedInternal = signal(false);

  // Linked signal combines external input and internal state
  readonly selected = linkedSignal<boolean, boolean>({
    source: () => this.selectedInput() ?? false,
    computation: (externalSelected, previous) => {
      // Prefer external input if defined, otherwise use internal
      return externalSelected ?? previous?.value ?? this._selectedInternal();
    },
  });

  // ControlValueAccessor implementation
  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this._selectedInternal.set(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disabled state
  }

  protected selectDevice(): void {
    if (!this.selected()) {
      this._selectedInternal.set(true);
      this.selectedChange.emit(this.device().id);
      this.onChange(true);
      this.onTouched();
    }
  }
}