import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDivider],
  templateUrl: './main.html',
  styleUrls: ['./main.scss']
})
export class Main {

}