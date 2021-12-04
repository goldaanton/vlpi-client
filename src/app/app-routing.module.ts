import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AdminExercisesComponent } from './pages/admin-exercises/admin-exercises.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';

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
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-modules/:id',
    component: AdminExercisesComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'modules/:module_id/exercises/:id',
    component: TasksComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
