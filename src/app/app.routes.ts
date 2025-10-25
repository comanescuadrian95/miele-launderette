import { Routes } from '@angular/router';
import { Home, Cycles } from './features';


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
    path: '**',
    redirectTo: '/home'
  }
];
