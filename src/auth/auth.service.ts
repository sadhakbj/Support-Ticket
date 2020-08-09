import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './../entities/user.entity'
import { LoginDTO, RegisterDTO } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(userData: RegisterDTO) {
    try {
      const user = this.userRepository.create(userData)
      await user.save()
      const token = this.generateToken(user.id, user.username)
      return { user, token }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async authenticate({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { email } })
      const passwordIsValid = await user.comparePassword(password)
      if (!passwordIsValid) {
        throw new UnauthorizedException('Invalid login credentials.')
      }
      const token = this.generateToken(user.id, user.username)
      return { user, token }
    } catch (error) {
      throw new UnauthorizedException('Invalid login credentials.')
    }
  }

  /**
   *
   * @param id
   * @param username
   */
  generateToken(id: string, username: string): string {
    const payload = { id, username }
    return this.jwtService.sign(payload)
  }
}
