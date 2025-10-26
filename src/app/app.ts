import { Component, signal } from '@angular/core';
import { Main, Header, Footer } from './layout';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [Main, Header, Footer, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Launderette');
}
