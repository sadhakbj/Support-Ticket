import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './../../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  /**
   *
   * @param username
   */
  async findByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } })
  }

  /**
   *
   * @param id
   * @param data
   */
  async updateUser(id: string, data: any) {
    await this.userRepository.update({ id }, data)
    return await this.userRepository.findOne(id)
  }
}
