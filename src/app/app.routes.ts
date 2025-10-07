import { Routes } from '@angular/router';
import { Login } from './features/Auth/login/login';
import { Register } from './features/Auth/register/register';
import { Landing } from '@src/app/features/Home/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
];
