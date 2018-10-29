import { Routes } from '@angular/router'

import { NotFoundComponent } from './not-found/not-found.component'
import { LoginComponent } from './security/login/login.component'
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

import { LoggedInGuard } from './security/loggedin.guard';

export const ROUTES: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'clients', component: ClientsComponent, canActivate: [LoggedInGuard] },
  {path: 'clients/:id', component: ClientDetailComponent, canActivate: [LoggedInGuard]},
  {path: '**', component: NotFoundComponent}
]