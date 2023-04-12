import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Environment } from '../../environments/environment.class';
import { APP_CONFIG } from '../../environments/environment';
import { promises } from 'dns';
import { Route, Router } from '@angular/router';
export interface Auth {
  address: string;
  password: string;
}

interface LoginResponse {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = APP_CONFIG;

  constructor(private http: HttpClient, private readonly router: Router) {}

  public async login(user: Auth): Promise<string> {
    const payload = {
      address: user.address,
      password: user.password
    };

    try {
      const response = await lastValueFrom(this.http.post<LoginResponse>(this.apiUrl.backend.auth.url + '/login', payload));
      const token = response.access_token;
      if(token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
        return token;
      }
      return;
    } catch (error) {
      throw new Error(error.error.message);
    }
  }

  public logout() {
    localStorage.removeItem('token'); // remove JWT token from local storage
    this.router.navigate(['./login']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // check if JWT token is present in local storage
  }

  public getToken(): string {
    console.log('jwt >>>', localStorage.getItem('token'))
    return localStorage.getItem('token'); // get JWT token from local storage
  }

  public register(address: string, password: string) {}
}
