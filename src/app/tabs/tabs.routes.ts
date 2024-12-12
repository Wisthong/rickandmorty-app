import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'rickandmorty',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'character/:id',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
        title: 'Personaje',
      },

      {
        path: '',
        redirectTo: 'rickandmorty',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
