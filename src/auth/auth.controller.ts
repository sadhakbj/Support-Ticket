import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LoginDTO, RegisterDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) userData: RegisterDTO): any {
    return this.authService.register(userData)
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO): any {
    return this.authService.authenticate(credentials)
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(): string {
    return 'Hello Bijaya'
  }
}
