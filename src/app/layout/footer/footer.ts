import { Component, ChangeDetectionStrategy, inject, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { Router, NavigationEnd } from "@angular/router";
import { filter, map } from "rxjs";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbar, MatButton, MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly _router = inject(Router);

  readonly currentUrl = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects || event.url)
    ),
    {
      initialValue: this._router.url,
    }
  );

  readonly showBackButton = computed(() => ['/cycles-list', '/start-cycle'].includes(this.currentUrl()));
  readonly showStartCycleButton = computed(() => this.currentUrl() !== '/start-cycle');
  readonly showCheckCyclesButton = computed(() => this.currentUrl() !== '/cycles-list');

  onNavigateBack(): void {
    this._router.navigate(['/home']);
  }

  onStartCycle(): void {
    this._router.navigate(['/start-cycle']);
  }

  checkCycles(): void {
    this._router.navigate(['/cycles-list']);
  }
}
