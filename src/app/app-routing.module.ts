// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { TransactionPageComponent } from './pages/transactions/transaction-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransferMoneyComponent } from './pages/transfer-money/transfer-money.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { path: '', component: PagesComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'transaction', component: TransactionPageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'transfer', component: TransferMoneyComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
