import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { APP_CONFIG } from '../../environments/environment';
import { lastValueFrom, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Address } from '../interfaces/address.interface';
import { UserInterface } from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private environment = APP_CONFIG;
  private isLoggedIn = false;
  constructor(
    private readonly http: HttpClient,
  ) { }

  public async getUsers(): Promise<User[]> {
    return await lastValueFrom(this.http.get<User[]>(this.environment.backend.user.url));
  }

  public async getAccountUser(): Promise<Address> {
    const token = localStorage.getItem('token');
    const user: { address: string; iat: number } = jwt_decode.default(token);
    const api = `${this.environment.bit2.url}?q=addressinfo&key=c535662a5103&a=${user.address}`;
    try {
      const data = await lastValueFrom(this.http.get<Address>(api));
      return data;
    } catch (error) { throw new Error(error); }
  }

  public async getUsdPrice(total: number): Promise<number> {
    try {
      const data = await lastValueFrom(this.http.get<number>(this.environment.bit2.wallet.price.url));
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getCurrentPrice(): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const currentPrice = await lastValueFrom(this.http.get<{ 'bitcoin-2': { usd: string } }>(this.environment.bit2.wallet.price.url));
      return currentPrice['bitcoin-2'].usd;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getCurrentCirculating(): Promise<string> {
    try {
      const currentPrice = await lastValueFrom(this.http.get<string>(this.environment.bit2.url + '?q=circulating'));
      return currentPrice;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getTotalCoins(): Promise<string> {
    try {
      const currentPrice = await lastValueFrom(this.http.get<string>(this.environment.bit2.url + '?q=totalcoins'));
      return currentPrice;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateUserAccount(body: UserInterface): Promise<UserInterface> {
    try {
      return await lastValueFrom(this.http.put<UserInterface>(this.environment.backend.user.url + '/' + body.id, body));
    } catch (error) {
      throw new error('cannot Update user', error);
    }
  }

  public async getUserByAddress(): Promise<UserInterface> {
    const token = localStorage.getItem('token');
    const user: { address: string; iat: number } = jwt_decode.default(token);
    const url: string = this.environment.backend.user.url;
    try {
      return await lastValueFrom(this.http.get<UserInterface>(`${url}/address/${user.address}`));
    } catch (error) {
      throw new Error(`Cannot get user with Address ${user.address} >>> ${error}`);
    }
  }

}
