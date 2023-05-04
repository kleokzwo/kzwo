import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public errorMessage = '';
  public registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public async onSubmit(): Promise<void> {
    try {
      await this.authService.register(this.registerForm);
    } catch (error) {
      console.log('error >>>', error)
      this.errorMessage = error.message;
      throw new Error(error);
    }
  }
}
