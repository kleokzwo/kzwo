import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
interface LatestTransaction {
  amount: string;
  datetime: string;
  receiver: string;
  sender: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html'
})

export class TransactionComponent implements OnInit {
  public transactions: LatestTransaction[];

  public constructor(private transactionService: TransactionService) { }

  public async ngOnInit(): Promise<void> {
    console.log('was geht hier!')
    await this.getTransactionsUser();
  }

  public async getTransactionsUser(): Promise<LatestTransaction[]> {
    const transaction = await this.transactionService.getTransactionFromUserAddress();
    console.log('data transaction >>>', transaction);
    this.transactions = transaction;
    return transaction;
  }
}
