import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { LoginComponent } from "./login/login.component";
import { ServiceLogin } from "./service/serviceLogin";
import { HomeComponent } from "./home/home.component";
import { MockXHRBackend } from "./mock-backend";
import { AuthGuard } from "./auth";
import { RegisterComponent } from "./register/register.component";
import { MenuComponent } from "./menu/menu.component";
import { MenuService } from "./service/menuService";
import { FavoriteDirective } from "./favorite.directive";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    FavoriteDirective
  ],
  providers: [
    ServiceLogin,
    AuthGuard,
    MenuService,
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}