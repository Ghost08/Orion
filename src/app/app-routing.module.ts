import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PetitionComponent } from './petition/petition.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "petition",
    component: PetitionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "petition/:Petition_No",
    component: PetitionComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"about",
    component:AboutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
