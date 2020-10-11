import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { Match } from 'src/http/validations/match.decorator'

export class LoginDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string

  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ type: String })
  password: string
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string

  @IsString()
  @MinLength(4)
  @MaxLength(12)
  @ApiProperty({ type: String })
  username: string

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  @ApiProperty({ type: String })
  password: string

  @IsNotEmpty()
  @Match('password')
  @ApiProperty({ type: String })
  password_confirmation: string
}
