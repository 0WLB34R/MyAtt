import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttProffComponent } from './components/att-proff/att-proff.component';
import { AttStudentComponent } from './components/att-student/att-student.component';



const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch:'full'},
  
  {path:'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path:'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  //{path:'login', component: SignlogComponent},// ...canActivate(redirectLoggedInToDashboard)},
  //{path:'dashboard', component: DashboardComponent },//...canActivate(redirectUnauthorizedToLogin)},
  {path:'attp', component: AttProffComponent},
  {path:'atts', component: AttStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
