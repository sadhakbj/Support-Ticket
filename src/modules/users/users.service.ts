import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './../../entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  /**
   *
   * @param username
   */
  async findByUserName(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } })
  }

  /**
   * @param id
   */
  async findUserById(id: string) {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
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

  /**
   * Follow a particular user.
   * @param currentUser
   * @param id
   */
  async followUser(currentUser: UserEntity, id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['followers'], select: ['id', 'email'] })
    if (!currentUser.follows(user)) {
      user.followers.push(currentUser)
      await user.save()
    }

    return user.toProfile(currentUser)
  }

  /**
   *
   * @param currentUser
   * @param id
   */
  async unfollowUser(currentUser: UserEntity, id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['followers'],
      select: ['id', 'email'],
    })

    if (currentUser.follows(user)) {
      user.followers = user.followers.filter(follower => {
        follower.id !== id
      })

      await user.save()
    }
    return user.toProfile(currentUser)
  }
}
