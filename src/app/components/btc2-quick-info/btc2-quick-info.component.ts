import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-btc2-quick-info',
  templateUrl: './btc2-quick-info.component.html'
})

export class Btc2QuickInfoComponent implements OnInit {

  public currenPrice: string;
  public totalCilculating: string;
  public totalCoins: string;
  public constructor(private readonly userService: UserService) {}
  public async ngOnInit(): Promise<void> {
    this.currenPrice = await this.userService.getCurrentPrice();
    this.totalCilculating = await this.userService.getCurrentCirculating();
    this.totalCoins = await this.userService.getTotalCoins();
  }
}
