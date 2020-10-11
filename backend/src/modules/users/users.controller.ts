import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { UserEntity } from './../../entities/user.entity'
import { BaseController } from './../../http/controllers/base.controller'
import { AuthUser } from './../auth/authuser.decorator'
import { UpdateUserDto } from './users.dto'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard())
@ApiTags('Users')
export class UsersController extends BaseController {
  constructor(private userService: UsersService) {
    super()
  }

  @Get('/')
  @ApiBearerAuth()
  async getAllUsers(@Res() res: Response): Promise<any> {
    const users = await this.userService.getAll()

    return this.sendSuccessResponse(res, 'Successfully fetched users', users)
  }

  @Get('/current-user')
  async findByUserName(@AuthUser() { username }: UserEntity, @Res() res: Response) {
    const currentUser = await this.userService.findByUserName(username)

    return this.sendSuccessResponse(res, 'Successfully fetched current user', currentUser)
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findUserById(id)

    return this.sendSuccessResponse(res, 'Successfully fetched user details.', user)
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
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
