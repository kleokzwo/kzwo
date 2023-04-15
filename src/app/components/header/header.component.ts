import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public userAddress: string;
    constructor(private readonly authService: AuthService) {}

    public async ngOnInit(): Promise<void>{
      const token = localStorage.getItem('token');
      const user: { address: string; iat: number } = jwt_decode.default(token);
      this.userAddress = user.address;
    }

    public onLogout() {
      this.authService.logout();
    }
}
