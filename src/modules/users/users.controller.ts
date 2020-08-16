import { Body, Controller, Get, Param, Put, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthUser } from './../../auth/authuser.decorator'
import { UserEntity } from './../../entities/user.entity'
import { UpdateUserDto } from './users.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('current-user')
  async findByUserName(@AuthUser() { username }: UserEntity) {
    return await this.userService.findByUserName(username)
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) data: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, data)
  }
}
