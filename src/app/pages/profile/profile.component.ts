import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../../../shared/interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public userForm: FormGroup;

  public constructor(private formBuilder: FormBuilder, private readonly userService: UserService) { }
  public async ngOnInit(): Promise<void> {
    await this.getPopulatedField();
  }

  public async getPopulatedField(): Promise<UserInterface> {
    this.userForm = this.formBuilder.group({
      name: [''],
      address: ['', Validators.required],
      privateKey: [''],
    });
    const user = await this.userService.getUserByAddress();
    this.userForm.setValue({
      name: user.name ?? '',
      address: user.address,
      privateKey: user.privateKey
    });
    return user;
  }

  public async onSubmit() {
    const user = await this.userService.getUserByAddress();
    const updatedUser = this.userForm.value as UserInterface;
    const payload = {...updatedUser, id: user.id};
    try {
      await this.userService.updateUserAccount(payload);
    } catch (error) {
      throw new Error(`Cannot Update User while Error >>> ${error}`);
    }
  }
}
