// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // isLoggedIn = false;

  // constructor(private userService: UserService, private readonly authService: AuthService) {}

  // public ngOnInit() {
  //   this.isLoggedIn = this.userService.isUserLoggedIn();
  // }

  // onLogout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false;
  // }
}
