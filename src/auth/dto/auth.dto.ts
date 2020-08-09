import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class LoginDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  password: string
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string
}
