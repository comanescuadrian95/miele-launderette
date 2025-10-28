import { Component, signal } from '@angular/core';
import { Footer, Header, Main } from './layout';

@Component({
  selector: 'app-root',
  imports: [Main, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly title = signal('Miele laundurette');
}
