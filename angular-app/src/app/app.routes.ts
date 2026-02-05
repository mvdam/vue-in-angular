import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VueComponent } from './pages/vue/vue.component';

export const routes: Routes = [
  {
    path: '*',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'vue',
    component: VueComponent,
    title: 'Vue (embedded)',
  },
];
