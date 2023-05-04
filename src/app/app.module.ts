import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/accounts/account.component';
import { Btc2QuickInfoComponent } from './components/btc2-quick-info/btc2-quick-info.component';
import { TransactionComponent } from './components/transactions/transaction.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TransactionPageComponent } from './pages/transactions/transaction-page.component';
import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LatestTransactionComponent } from './components/latest-transaction/latest-transaction.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    AccountComponent,
    Btc2QuickInfoComponent,
    TransactionComponent,
    TransactionPageComponent,
    PaginationComponent,
    PagesComponent,
    AuthComponent,
    LatestTransactionComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
