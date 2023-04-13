import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './pages/users/user.component';
import { Environment } from '../environments/environment.class';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/accounts/account.component';
import { Btc2QuickInfoComponent } from './components/btc2-quick-info/btc2-quick-info.component';

@NgModule({
  declarations: [
    AppComponent,
    // UserListComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AccountComponent,
    Btc2QuickInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,

  ],
  providers: [Environment],
  bootstrap: [AppComponent]
})
export class AppModule { }
