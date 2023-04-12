import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      // address: new FormControl(''),
      // password: new FormControl('')
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const address = this.registerForm.value.address;
    const password = this.registerForm.value.password;

    // this.authService.register(address, password).subscribe(
    //   response => {
    //     this.isLoading = false;
    //     console.log('Registration successful!');
    //   },
    //   error => {
    //     this.isLoading = false;
    //     console.log('Registration failed!', error);
    //   }
    // );
  }
}
