import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from './../../entities/user.entity'
import { AuthUser } from './../auth/authuser.decorator'
import { UpdateUserDto } from './users.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getAllUsers() {
    return await this.userService.getAll()
  }

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

  @Post('/:id/follow')
  async followUser(@AuthUser() currentUser: UserEntity, @Param('id') id: string) {
    return await this.userService.followUser(currentUser, id)
  }

  @Delete('/:id/unfollow')
  async unfollowUserA(@AuthUser() currentUser: UserEntity, @Param('id', new ParseUUIDPipe()) userId: string) {
    return await this.userService.unfollowUser(currentUser, userId)
  }
}
