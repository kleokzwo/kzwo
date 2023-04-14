import { Component, OnInit } from '@angular/core';
import { Address } from '../../interfaces/address.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})

export class AccountComponent implements OnInit {
    public address: Address;
    public totalBalance: string;
    public constructor(private readonly userService: UserService) {}
    public async ngOnInit(): Promise<void> {
        this.address = await this.getAccount();
        await this.getCurrentUsdPrice();

    }

    public async getAccount(): Promise<Address> {
        return await this.userService.getAccountUser();
    }

    public async getCurrentUsdPrice(): Promise<number> {
        const data = await this.userService.getUsdPrice(this.address.balance);
        this.totalBalance = (data['bitcoin-2'].usd * this.address.balance).toFixed(4).toString();
        return data['bitcoin-2'].usd * this.address.balance;
    }
}
