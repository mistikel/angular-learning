import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth";
import { RegisterComponent } from "./register/register.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'list', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];
export const routing = RouterModule.forRoot(appRoutes);
