import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  input,
  output,
  signal,
  linkedSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioButton } from '@angular/material/radio';
import { DeviceEnhanced } from '../../models';
@Component({
  selector: 'app-card-device',
  standalone: true,
  imports: [MatCardModule, MatRadioButton],
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

  private _selectedInternal = signal(false);

  readonly selected = linkedSignal<boolean, boolean>({
    source: () =>
      this.selectedInput() !== undefined ? this.selectedInput()! : this._selectedInternal(),
    computation: (externalSelected) => {
      return externalSelected !== undefined ? externalSelected : this._selectedInternal();
    },
  });

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

  setDisabledState?(isDisabled: boolean): void {}

  selectDevice(): void {
    if (!this.selected()) {
      this._selectedInternal.set(true);
      this.selectedChange.emit(this.device().id);
      this.onChange(true);
      this.onTouched();
    }
  }
}
