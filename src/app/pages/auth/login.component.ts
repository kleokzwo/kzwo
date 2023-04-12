// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Auth, AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  public errorMessage = '';
  public userForm: FormGroup;
  constructor(private readonly authService: AuthService) {}

  public ngOnInit() {
      this.userForm = new FormGroup({
        address: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      });
  }

  public async onSubmitLogin() {
    try {
      await this.authService.login(this.userForm.value);
    } catch (error) {
      console.log('error >>>', error)
      this.errorMessage = error.message;
    }
  }
}
