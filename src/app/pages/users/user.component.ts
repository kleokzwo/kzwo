import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  data: any;

  constructor(private readonly userService: UserService) { }

  public async ngOnInit() {
    await this.getUsers();
    console.log('hallo >>>', this.data)
  }

  public async getUsers() {
    try {
      this.users = await this.userService.getUsers();
    } catch (error) {
      console.log(error);
    }
  }
}
