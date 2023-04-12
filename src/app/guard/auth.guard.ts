import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('triggert canActive')
    try {
      const token = this.authService.getToken()
      if(!this.authService.isLoggedIn && !token) {
        this.router.navigate(['/login']);
        return false;
      }
      console.log('token >>>', token)
    } catch(error) {
      console.log('error AuthGuard can active >>>', error)
    }
    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']); // redirect to login page if user is not logged in
    //   return false;
    // }

    // const token = this.authService.getToken();
    // console.log('token here >>>', token)
    // if (!token) {
    //   this.router.navigate(['/login']); // redirect to login page if JWT token is not present
    //   return false;
    // }

    // const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    // if (new Date(tokenPayload.exp * 1000) < new Date()) {
    //   this.router.navigate(['/login']); // redirect to login page if JWT token is expired
    //   return false;
    // }

    // // redirect to dashboard page after successful login
    // if (this.router.url === '/login') {
    //   this.router.navigate(['/dashboard', this.authService.getToken()]);
    // }

    return true;
  }
}
