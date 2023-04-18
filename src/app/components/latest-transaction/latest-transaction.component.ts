import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
const robohashAvatars = require('robohash-avatars');

interface LatestTransaction {
  amount: string;
  datetime: string;
  receiver: string;
  sender: string;
}


@Component({
  selector: 'app-latest-transaction',
  templateUrl: './latest-transaction.component.html'
})

export class LatestTransactionComponent implements OnInit {

  public transactions: LatestTransaction[];

  public constructor(private readonly transactionService: TransactionService) { }
  public async ngOnInit(): Promise<void> {
    await this.getLatestTransaction();
  }

  public async getLatestTransaction(): Promise<LatestTransaction[]> {
    const transactions = await this.transactionService.getTransactionFromUserAddress();
    const sortTransaction = transactions.sort((a, b) => {
      const dateA: any = new Date(a.datetime.split('.').reverse().join('-'));
      const dateB: any = new Date(b.datetime.split('.').reverse().join('-'));

      if (dateA.getTime() === dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateA - dateB;
      }
    });

    const newestDate = sortTransaction[sortTransaction.length - 1].datetime;
    const newestObjects = sortTransaction.filter(obj => obj.datetime === newestDate);

    this.transactions = newestObjects;
    return newestObjects;
  }

  public getAvatar(name: string) {
    return robohashAvatars.generateAvatar({
      username: name,
      background: robohashAvatars.BackgroundSets.RandomBackground1,
      characters: robohashAvatars.CharacterSets.Robots,
      height: 400,
      width: 400
    });
  }
}
