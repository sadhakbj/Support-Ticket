import { Body, Controller, Get, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { BaseController } from './../../http/controllers/base.controller'
import { AuthService } from './auth.service'
import { LoginDTO, RegisterDTO } from './dto/auth.dto'

@Controller('auth')
@ApiTags('Authentication')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super()
  }

  @Post('/register')
  async register(@Body(ValidationPipe) userData: RegisterDTO, @Res() res: Response): Promise<any> {
    const user = await this.authService.register(userData)

    return this.sendSuccessResponse(res, 'User registerd successfully.', user)
  }

  @Post('/login')
  async login(@Body(ValidationPipe) credentials: LoginDTO, @Res() res: Response): Promise<any> {
    const user = await this.authService.authenticate(credentials)

    return this.sendSuccessResponse(res, 'User logged in successfully.', user)
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(): string {
    return 'Hello Bijaya'
  }
}
