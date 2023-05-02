import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
    console.log('findAll >>>', await this.userRepository.find())
    return this.userRepository.find();
  }

  public async findOne(address: string): Promise<User> {
    return await this.userRepository.findOne({ where: { address } });
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
}
