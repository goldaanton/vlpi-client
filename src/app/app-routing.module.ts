import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ExercisesComponent } from './pages/exercises/exercises.component';

import { LoginComponent } from './pages/login/login.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'modules/:id',
    component: ExercisesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
