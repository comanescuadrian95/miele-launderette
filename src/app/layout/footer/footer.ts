import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  private readonly _router = inject(Router);

  protected onNavigateBack() {
    // this._router.navigate(['/']);
    console.log('Navigate Back to Home');
  }

  protected onStartCycle() {
    // this._router.navigate(['/start-cycle']);
    console.log('Start New Laundry Cycle');
  }
}
