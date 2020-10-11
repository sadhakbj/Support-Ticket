import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Repository } from 'typeorm'
import { UserEntity } from './../../entities/user.entity'
import { AuthPayload } from './interface/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: AuthPayload) {
    const { id, username } = payload
    const user = this.userRepository.find({ where: { username } })
    if (!user) {
      throw new UnauthorizedException('Not logged in.')
    }
    return user
  }
}
