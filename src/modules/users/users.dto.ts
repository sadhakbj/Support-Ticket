import { IsEmail, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  image: string

  @IsOptional()
  bio: string
}
