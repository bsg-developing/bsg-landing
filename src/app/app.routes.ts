import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {ServiceDetailComponent} from './pages/service-detail/service-detail.component';


export const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: '', component: HomeComponent },
      { path: 'services/:slug', component: ServiceDetailComponent },
      { path: '**', component: NotfoundComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'ru',
    pathMatch: 'full'
  }
];
