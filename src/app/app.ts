import { Component, signal } from '@angular/core';
import { Main, Header, Footer } from './layout';

@Component({
  selector: 'app-root',
  imports: [Main, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Launderette');
}
