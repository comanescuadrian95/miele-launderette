import { Routes } from '@angular/router';
import { Home, Cycles } from './features';
import { CreateCycles } from './features/pages/create-cycles/create-cycles';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home,
    title: 'Welcome - Miele Launderette'
  },
  {
    path: 'cycles',
    component: Cycles,
    title: 'Washing Cycles - Miele Launderette'
  },
  {
    path: 'start-cycle',
    component: CreateCycles,
    title: 'Create Washing Cycle - Miele Launderette'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
