import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { APP_CONFIG } from '../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../../backend/src/entities/user.entity';
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

  constructor(private http: HttpClient, private readonly router: Router) { }

  public async login(user: Auth): Promise<string> {
    const payload = {
      address: user.address,
      password: user.password
    };

    try {
      const response = await lastValueFrom(this.http.post<LoginResponse>(this.apiUrl.backend.auth.url + '/login', payload));
      const token = response.access_token;
      if (token) {
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
    localStorage.removeItem('token');
    this.router.navigate(['./']);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public async register(body: any): Promise<any> {
    const payload = {
      address: body.value.address,
      password: body.value.password
    };
    try {
      await lastValueFrom(this.http.post<any>(this.apiUrl.backend.auth.url + '/register', payload));
      this.router.navigate(['../login']);
      return;
    } catch (error) {
      console.log('Error from Service >>>', error)
      throw new Error(error.error.message);
    }
  }
}
