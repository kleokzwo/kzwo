import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpWrapperService } from './httpService.service';
import { APP_CONFIG } from '../../environments/environment';
import { lastValueFrom, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Address } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private environment = APP_CONFIG;
  private isLoggedIn = false;
  constructor(
    private readonly http: HttpClient,
    private readonly httpWrapper: HttpWrapperService,
    ) { }

  public async getUsers(): Promise<User[]> {
    return await lastValueFrom(this.http.get<User[]>(this.environment.backend.user.url));
  }

  public async getAccountUser(): Promise<Address> {
    const token = localStorage.getItem('token');
    console.log('tokenzzz >>>', token);
    const account = jwt_decode.default(token);
    console.log('account >>>', account);
    const url = 'https://chainz.cryptoid.info/btc2/api.dws?q=addressinfo&key=c535662a5103&a=1DREEVpCZxVaBEDgvhyF35NWiFPqsn1Fsw';
    try {
      const data = await lastValueFrom(this.http.get<Address>(url));
      return data;
    } catch(error) { throw new Error(error)}
  }

  public async getUsdPrice(total: number): Promise<number> {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-2&vs_currencies=usd';
    try {
      const data = await lastValueFrom(this.http.get<number>(url))
      return data;
    } catch(error) {
      throw new Error(error);
    }
  }

}
