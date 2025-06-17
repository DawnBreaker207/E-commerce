import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label: string = 'Date';
  @Input() mode: 'single' | 'range' = 'single';
  @Input() minDate = new Date(1950, 1, 1);
  @Input() maxDate = new Date(2099, 1, 1);
  @Input() readonly = false;

  value: Date | { start: Date | null; end: Date | null } | null = null;
  startDate = new Date();
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  getRangeStartValue(): Date | null {
    if (this.mode === 'range' && this.value && typeof this.value === 'object' && 'start' in this.value) {
      return this.value.start;
    }
    return null;
  }

  getRangeEndValue(): Date | null {
    if (this.mode === 'range' && this.value && typeof this.value === 'object' && 'end' in this.value) {
      return this.value.end;
    }
    return null;
  }

  writeValue(value: any): void {
    if (this.mode === 'range') {
      this.value = {
        start: value?.start ?? null,
        end: value?.end ?? null,
      };
    } else {
      this.value = value ?? null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  onSingleChange(event: MatDatepickerInputEvent<Date>) {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();
  }

  onStartChange(event: MatDatepickerInputEvent<Date>) {
    const range = this.ensureRange();
    range.start = event.value;
    this.value = range;
    this.onChange(range);
    this.onTouched();
  }

  onEndChange(event: MatDatepickerInputEvent<Date>) {
    const range = this.ensureRange();
    range.end = event.value;
    this.value = range;
    this.onChange(range);
    this.onTouched();
  }

  private ensureRange(): { start: Date | null; end: Date | null } {
    if (!this.value || typeof this.value !== 'object' || !('start' in this.value)) {
      return { start: null, end: null };
    }
    return { ...this.value };
  }
}
