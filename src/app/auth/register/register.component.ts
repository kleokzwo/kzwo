import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public async onSubmit(): Promise<void> {
    // this.isLoading = true;
    // const address = this.registerForm.value.address;
    // const password = this.registerForm.value.password;
    try {
      await this.authService.register(this.registerForm)
    } catch (error) {
      throw new Error(error)
    }
  }
}
