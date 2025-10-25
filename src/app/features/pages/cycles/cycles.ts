import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Card } from '../../components/card';

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [MatTabGroup, MatTab, Card],
  templateUrl: './cycles.html',
  styleUrl: './cycles.scss'
})
export class Cycles {

}