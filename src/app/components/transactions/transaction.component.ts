import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html'
})

export class TransactionComponent implements OnInit {
  public transactions = [];

  public constructor(private transactionService: TransactionService) { }

  public async ngOnInit(): Promise<void> {
    await this.getTransactionsUser();
  }

  public async getTransactionsUser(): Promise<any> {
    const transaction = await this.transactionService.getTransactionFromUserAddress();
    console.log('data transaction >>>', transaction)
    this.transactions = transaction;
    return transaction;
  }
}
