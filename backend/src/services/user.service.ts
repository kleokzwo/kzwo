import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/entities/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // we start here
  public async findByAddress(address: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        address: address,
      },
    });
  }

  // end Here

  public async findAll(): Promise<User[]> {
    console.log('findAll >>>', await this.userRepository.find());
    return this.userRepository.find();
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async findOneByAddress(address: string): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { address },
    };
    return this.userRepository.findOne(options);
  }

  public async create(user: any): Promise<any> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async removeUserById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async updateUser(
    id: number,
    userUpdated: UserInterface,
  ): Promise<UserInterface> {
    console.log('update >>>', userUpdated);
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} Not Found`);
    }

    user.name = userUpdated.name || user.name;
    user.password = userUpdated.password || user.password;
    user.address = userUpdated.address || user.address;
    user.privateKey = userUpdated.privateKey || user.privateKey;
    return this.userRepository.save(user);
  }
}
