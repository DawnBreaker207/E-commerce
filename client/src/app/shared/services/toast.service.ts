import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, type: 'success' | 'error' | 'info' | 'warn' = 'info') {
    this.snackBar.openFromComponent(ToastComponent, {
      duration: 5000,
      data: {
        message,
        icon: this.getIcon(type),
      },
      panelClass: this.getStyleClasses(type),
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private getIcon(type: string): string {
    return (
      {
        success: 'check_circle',
        error: 'error',
        info: 'info',
        warn: 'warning',
      }[type] || 'info'
    );
  }

  private getStyleClasses(type: string): string[] {
    return [
      'rounded-md',
      'p-4',
      'text-white',
      'shadow-lg',
      'w-[320px]',
      'flex',
      'items-start',
      'gap-2',
      'bg-' + this.getBgColor(type),
    ];
  }

  private getBgColor(type: string): string {
    return (
      {
        success: '[#22c55e]',
        error: '[#ef4444]',
        info: '[#3b82f6]',
        warn: '[f59e0b]',
      }[type] || '[#3b82f6]'
    );
  }
}
