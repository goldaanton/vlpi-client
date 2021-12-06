import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './interceptors/auth.interceptor';

import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModulesComponent } from './pages/modules/modules.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AdminExercisesComponent } from './pages/admin-exercises/admin-exercises.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AdminTasksComponent } from './pages/admin-tasks/admin-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    ModulesComponent,
    ProfileComponent,
    ExercisesComponent,
    TasksComponent,
    AdminExercisesComponent,
    ExerciseComponent,
    ConfirmDialogComponent,
    AdminTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
