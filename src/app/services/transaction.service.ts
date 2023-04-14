import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { APP_CONFIG } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private env = APP_CONFIG;

  constructor(private http: HttpClient) { }

  public async getTransactionFromUserAddress(): Promise<any[]> {
    const token = localStorage.getItem('token');
    const user: { address: string; iat: number } = jwt_decode.default(token);
    const summaryUrl = `${this.env.bit2.url}?q=multiaddr&active=${user.address}&key=${this.env.bit2.apiKey}`;
    try {
      const summaryResponse = await lastValueFrom(this.http.get<any>(summaryUrl));
      const transactionHashes = summaryResponse.txs.map(tx => tx.hash);
      const transactionPromises = transactionHashes.map(
        hash => lastValueFrom(this.http.get<any>(`${this.env.bit2.url}?q=txinfo&t=${hash}&key=${this.env.bit2.apiKey}`)));

      const transactionDetails = await Promise.all(transactionPromises);
      console.log('transactionDetails >>>', transactionDetails);

      const latestTransactions = transactionDetails.map(tx => ({
        datetime: this.convertHumanReadableDateTime(tx.timestamp * 1000),
        amount: (tx.total_output - tx.total_input).toFixed(4),
        receiver: tx.inputs ? tx.inputs[0].addr : '',
        sender: tx.outputs ? tx.outputs[1].addr : ''
      })).slice(0, 5);
      return latestTransactions;
    } catch (error) {
      throw new Error(error);
    }
  }

  public convertHumanReadableDateTime(date: number) {
    const datetime = new Date(date);
    const day = datetime.getDate().toString().padStart(2, '0');
    const month = (datetime.getMonth() + 1).toString().padStart(2, '0');
    const year = datetime.getFullYear().toString();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

}
