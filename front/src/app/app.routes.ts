import { Routes } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotaGridAntigo } from './pages/notaGridAntigo/notaGridAntigo';
import { Products } from './pages/products/products';
import { Clients } from './pages/clients/clients';
import {CidadeEstado} from './shared/components/cidade-estado/cidade-estado';
import {Teste} from './pages/teste/teste';

export const routes: Routes = [
  {
    path: 'nota',
    component: NotaGridAntigo,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'products',
    component: Products,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'clients',
    component: Clients,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'teste',
    component: Teste,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
