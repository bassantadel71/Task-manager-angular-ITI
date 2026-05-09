import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
// import { Home } from './components/pages/home/home';
import { HomeComponent } from './components/pages/home/home';
import { FormAddTask } from './components/pages/form-add-task/form-add-task';
import { Tasks } from './components/pages/tasks/tasks';
import { About } from './components/pages/about/about';
import { NotFound } from './components/pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';
import { TaskDetails } from './components/pages/tasks/task-details/task-details';
import { EditTask } from './components/pages/tasks/edit-task/edit-task';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
    ],
  },
  {
    path: 'main',
    component: Main,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent  },
      { path: 'add-task', component: FormAddTask },
      { path: 'tasks', component: Tasks },
      { path: 'tasks/:id', component: TaskDetails },
      { path: 'tasks/:id/edit', component: EditTask },
      { path: 'about', component: About },
      { path: 'about', component: About },
    ],
  },
  { path: '**', component: NotFound },
];
