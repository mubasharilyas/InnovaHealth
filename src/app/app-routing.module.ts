import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';
const routes: Routes = [
  {
    path: "", redirectTo: "",
    pathMatch: "full",
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NonAuthGuard]

  },
  {
    path: "dashboard",
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]


  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
