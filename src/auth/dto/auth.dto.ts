import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Match } from 'src/http/validations/match.decorator'

export class LoginDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(4)
  password: string
}

export class RegisterDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string

  @IsNotEmpty()
  @Match('password')
  password_confirmation: string
}
