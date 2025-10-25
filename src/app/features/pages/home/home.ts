import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButton, MatIcon, MatFabButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected scrollToNextSection(): void {
    const nextSection = document.getElementById('next-section');

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
