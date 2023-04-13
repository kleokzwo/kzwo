// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // isLoggedIn = false;

  constructor(private userService: UserService) { }

  public async ngOnInit(): Promise<void> {
    // await this.userService.getDetails();
  }

  // onLogout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false;
  // }
}
